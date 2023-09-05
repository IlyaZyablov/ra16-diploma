import { Link } from "react-router-dom";

function CartItem(data) {
  const { index, id, title, size, count, price } = data.cartItemData;
  const { handleDeleteItem } = data;

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