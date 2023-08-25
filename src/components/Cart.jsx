import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import iziToast from "izitoast";
import { setItemsList } from "../store/cartSlice";

function Cart() {
  const cardInlineStyle = {
    maxWidth: '30rem',
    margin: '0 auto',
  };

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const onFormSubmit = async evt => {
    evt.preventDefault();
    evt.target.elements[3].blur();

    const { address, agreement, phone } = evt.target.elements;

    if (!phone.value.length) {
      iziToast.error({
        message: 'Необходимо ввести номер телефона!',
        position: 'bottomCenter',
      });
      return;
    }

    if (!address.value.length) {
      iziToast.error({
        message: 'Необходимо ввести адрес доставки!',
        position: 'bottomCenter',
      });
      return;
    }

    if (!agreement.checked) {
      iziToast.error({
        message: 'Для продолжения необходимо согласиться с правилами доставки!',
        position: 'bottomCenter',
      });
      return;
    }

    const data = {
      owner: {
        phone: phone.value,
        address: address.value,
      },
      items: cartItems.list.map(({ id, price, count }) => ({ id, price, count })),
    };

    let error = false;
    const result = await fetch(`${import.meta.env.VITE_MAIN_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.ok)
      .catch(err => {
        console.error(err);
        error = true;
      });

    if (!error && result === true) {
      iziToast.success({
        message: 'Ваш заказ успешно оформлен!',
        position: 'bottomCenter',
      });
      evt.target.reset();

      dispatch(setItemsList([]));
    } else {
      iziToast.error({
        message: 'Произошла ошибка при оформлении заказа! Повторите попытку позже.',
        position: 'bottomCenter',
      });
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.list.length > 0 &&
                  cartItems.list.map((elem, i) =>
                    <CartItem key={elem.id} cartItemData={{...elem, index: i + 1}} />
                  )
                }
                {cartItems.list.length > 0 ? (
                  <tr>
                    <td colSpan="5" className="text-right">Общая стоимость</td>
                    <td>{cartItems.totalPrice.toLocaleString()} руб.</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="7" className="text-left">В корзине пока пусто!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          {cartItems.list.length > 0 &&
            <section className="order">
              <h2 className="text-center">Оформить заказ</h2>
              <div className="card" style={cardInlineStyle}>
                <form className="card-body" onSubmit={onFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input className="form-control" id="phone" placeholder="Ваш телефон" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input className="form-control" id="address" placeholder="Адрес доставки" />
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="agreement" />
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                  </div>
                  <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>
              </div>
            </section>
          }
        </div>
      </div>
    </main>
  )
}

export default Cart;