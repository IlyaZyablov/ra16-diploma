import { Link } from "react-router-dom";
import { removeItem, updateTotalPrice } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import iziToast from "izitoast";

function CartItem(data) {
  const { index, id, title, size, count, price } = data.cartItemData;
  const dispatch = useDispatch();

  const handleDeleteItem = evt => {
    dispatch(removeItem(parseInt(evt.target.dataset.id, 10)));

    dispatch(updateTotalPrice());

    iziToast.success({
      message: 'Товар успешно удалён из корзины!',
      position: 'bottomCenter',
    });
  }

  return (
    <tr>
      <td scope="row">{index}</td>
      <td>
        <Link to={`/catalog/${id}`}>{title}</Link>
      </td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price.toLocaleString()} руб.</td>
      <td>{(price * count).toLocaleString()} руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" data-id={id} onClick={handleDeleteItem}>Удалить</button>
      </td>
    </tr>
  )
}

export default CartItem;