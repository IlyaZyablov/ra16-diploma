import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Item({ itemData }) {
  const { id, title, price, images } = itemData;

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
        <div className="card-body catalog-item-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price.toLocaleString()} руб.</p>
          <Link className="btn btn-outline-primary" to={`/catalog/${id}`}>Заказать</Link>
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  itemData: PropTypes.object,
};

export default Item;