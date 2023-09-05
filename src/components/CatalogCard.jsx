import iziToast from 'izitoast';

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";

import { addItem, updateTotalPrice } from "../store/cartSlice";
import { setCatalogItem } from "../store/itemsSlice";

import Preloader from "./Preloader";

function CatalogCard() {
  const { id } = useParams();
  const catalogItem = useSelector(state => state.items.catalogItem);
  const [error, setError] = useState(null);
  const { catalogItemDB } = useFetchData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);

    catalogItemDB.getInfo(parseInt(id, 10))
      .then(result => {
        dispatch(setCatalogItem({
          id: parseInt(id, 10),
          title: result.title,
          image: result.images[0],
          sku: result.sku,
          manufacturer: result.manufacturer,
          color: result.color,
          material: result.material,
          season: result.season,
          sizes: result.sizes,
          price: result.price,
        }));
      })
      .catch(error => {
        setError(error);
        iziToast.error({
          message: 'Произошла ошибка при загрузке карточки товара! Повторите попытку позже.',
          position: 'bottomCenter',
        });
      });
  }, []);

  function selectSize(evt) {
    dispatch(setCatalogItem({
      selectedSize: evt.target.textContent,
      statusSelect: true,
    }));
  }

  function changeCount(evt) {
    evt.target.blur();
    
    const currentCount = catalogItem.selectedCount;
    if (evt.target.textContent === '+') {
      if (catalogItem.selectedCount >= 10) {
        iziToast.error({
          message: 'Количество не может быть больше 10!',
          position: 'bottomCenter',
        });
        return;
      }

      dispatch(setCatalogItem({
        selectedCount: currentCount + 1,
      }));
    } else if (evt.target.textContent === '-') {
      if (catalogItem.selectedCount <= 1) {
        iziToast.error({
          message: 'Количество не может быть меньше 1!',
          position: 'bottomCenter',
        });
        return;
      }

      dispatch(setCatalogItem({
        selectedCount: currentCount - 1,
      }));
    }
  }

  function buyItem(evt) {
    evt.target.blur();
    
    if (!catalogItem.statusSelect) {
      iziToast.error({
        message: 'Выберите размер для оформления заказа!',
        position: 'bottomCenter',
      });
      return;
    }

    dispatch(setCatalogItem({
      selectedCount: 1,
      selectedSize: '0 US',
      statusSelect: false,
    }));
    
    dispatch(addItem({
      id: catalogItem.id,
      title: catalogItem.title,
      size: catalogItem.selectedSize,
      price: catalogItem.price,
      count: catalogItem.selectedCount,
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
          {catalogItemDB.loading ? (
            <Preloader />
          ) : (
            error ? (
              <p>Произошла ошибка при загрузке карточки товара!</p>
            ) : (
              <section className="catalog-item">
                <h2 className="text-center">{catalogItem.title}</h2>
                <div className="row">
                  <div className="col-5">
                    <img src={catalogItem.image} className="img-fluid" alt={catalogItem.title} />
                  </div>
                  <div className="col-7">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Артикул</td>
                          <td>{catalogItem.sku}</td>
                        </tr>
                        <tr>
                          <td>Производитель</td>
                          <td>{catalogItem.manufacturer}</td>
                        </tr>
                        <tr>
                          <td>Цвет</td>
                          <td>{catalogItem.color}</td>
                        </tr>
                        <tr>
                          <td>Материалы</td>
                          <td>{catalogItem.material}</td>
                        </tr>
                        <tr>
                          <td>Сезон</td>
                          <td>{catalogItem.season}</td>
                        </tr>
                        <tr>
                          <td>Повод</td>
                          <td>Прогулка</td>
                        </tr>
                      </tbody>
                    </table>
                    
                      {catalogItem.sizes.length > 0 &&
                        <div className="text-center">
                          <p>
                            Размеры в наличии:
                            {catalogItem.sizes.map((elem, i) => {
                              if (elem.available) {
                                return (
                                  <span key={i} className={`catalog-item-size${catalogItem.selectedSize === elem.size ? ' selected' : ''}`} onClick={selectSize}>
                                    {elem.size}
                                  </span>
                                );
                              }
                            })}
                          </p>
                          <p>Количество:
                            <span className="btn-group btn-group-sm pl-2">
                              <button className="btn btn-secondary" onClick={changeCount}>-</button>
                              <span className="btn btn-outline-primary">{catalogItem.selectedCount}</span>
                              <button className="btn btn-secondary" onClick={changeCount}>+</button>
                            </span>
                          </p>
                        </div>
                      }
                    {catalogItem.statusSelect === true ? (
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