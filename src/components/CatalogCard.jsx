import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import iziToast from 'izitoast';
import Preloader from "./Preloader";
import { useDispatch } from "react-redux";
import { addItem, updateTotalPrice } from "../store/cartSlice";

function CatalogCard() {
  const { id } = useParams();
  const [data, setData] = useState({ loading: true, error: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setData({ ...data, loading: true });

      let error = false;
      const item = await fetch(`${import.meta.env.VITE_MAIN_URL}/items/${id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .catch(err => {
          console.error(err);
          error = true;
        });
      
      if (!error) {
        setData({
          id: parseInt(id, 10),
          title: item.title,
          image: item.images[0],
          sku: item.sku,
          manufacturer: item.manufacturer,
          color: item.color,
          material: item.material,
          season: item.season,
          sizes: item.sizes,
          price: item.price,
          selectedCount: 1,
          selectedSize: '0 US',
          statusSelect: false,
          error: false,
          loading: false,
        });
      } else {
        iziToast.error({
          message: 'Произошла ошибка при загрузке карточки товара! Повторите попытку позже.',
          position: 'bottomCenter',
        });
        setData({ loading: false, error: true });
      }
    }
  
    init();
  }, [id]);

  function selectSize(evt) {
    setData({ ...data, selectedSize: evt.target.textContent, statusSelect: true });
  }

  function changeCount(evt) {
    evt.target.blur();
    if (evt.target.textContent === '+') {
      if (data.selectedCount >= 10) {
        iziToast.error({
          message: 'Количество не может быть больше 10!',
          position: 'bottomCenter',
        });
        return;
      }
      setData({ ...data, selectedCount: data.selectedCount += 1 });
    } else if (evt.target.textContent === '-') {
      if (data.selectedCount <= 1) {
        iziToast.error({
          message: 'Количество не может быть меньше 1!',
          position: 'bottomCenter',
        });
        return;
      }
      setData({ ...data, selectedCount: data.selectedCount -= 1 });
    }
  }

  function buyItem(evt) {
    evt.target.blur();
    
    if (!data.statusSelect) {
      iziToast.error({
        message: 'Выберите размер для оформления заказа!',
        position: 'bottomCenter',
      });
      return;
    }
    
    dispatch(addItem({
      id: data.id,
      title: data.title,
      size: data.selectedSize,
      price: data.price,
      count: data.selectedCount,
    }));

    dispatch(updateTotalPrice());

    navigate('/cart');

    iziToast.success({
      message: 'Товар успешно добавлен в корзину!',
      position: 'bottomCenter',
    });
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          {data.loading ? (
            <Preloader />
          ) : (
            data.error ? (
              <p>Произошла ошибка при загрузке карточки товара!</p>
            ) : (
              <section className="catalog-item">
                <h2 className="text-center">{data.title}</h2>
                <div className="row">
                  <div className="col-5">
                    <img src={data.image} className="img-fluid" alt={data.title} />
                  </div>
                  <div className="col-7">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Артикул</td>
                          <td>{data.sku}</td>
                        </tr>
                        <tr>
                          <td>Производитель</td>
                          <td>{data.manufacturer}</td>
                        </tr>
                        <tr>
                          <td>Цвет</td>
                          <td>{data.color}</td>
                        </tr>
                        <tr>
                          <td>Материалы</td>
                          <td>{data.material}</td>
                        </tr>
                        <tr>
                          <td>Сезон</td>
                          <td>{data.season}</td>
                        </tr>
                        <tr>
                          <td>Повод</td>
                          <td>Прогулка</td>
                        </tr>
                      </tbody>
                    </table>
                    
                      {data.sizes.length > 0 &&
                        <div className="text-center">
                          <p>
                            Размеры в наличии:
                            {data.sizes.map((elem, i) => {
                              if (elem.available) {
                                return (
                                  <span key={i} className={`catalog-item-size${data.selectedSize === elem.size ? ' selected' : ''}`} onClick={selectSize}>
                                    {elem.size}
                                  </span>
                                );
                              }
                            })}
                          </p>
                          <p>Количество:
                            <span className="btn-group btn-group-sm pl-2">
                              <button className="btn btn-secondary" onClick={changeCount}>-</button>
                              <span className="btn btn-outline-primary">{data.selectedCount}</span>
                              <button className="btn btn-secondary" onClick={changeCount}>+</button>
                            </span>
                          </p>
                        </div>
                      }
                    {data.statusSelect === true ? (
                      <button className="btn btn-danger btn-block btn-lg" onClick={buyItem}>В корзину</button>
                    ) : (
                      <button className="btn btn-danger btn-block btn-lg" disabled onClick={buyItem}>В корзину</button>
                    )}
                    
                  </div>
                </div>
              </section>
            )
          )}
        </div>
      </div>
    </main>
  )
}

export default CatalogCard;