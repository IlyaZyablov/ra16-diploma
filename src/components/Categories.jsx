import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function Categories({ list, selected, onSelect }) {
  const location = useLocation();

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
          <Link
            data-id={0}
            className={`nav-link${selected === 0 ? ' active' : ''}`}
            to={location.pathname}
            onClick={onSelect}
          >
            Все
          </Link>
        </li>
      {list.map(elem =>
        <li className="nav-item" key={elem.id}>
          <Link
            data-id={elem.id}
            className={`nav-link${selected === elem.id ? ' active' : ''}`}
            to={location.pathname}
            onClick={onSelect}
          >
            {elem.title}
          </Link>
        </li>
      )}
    </ul>
  )
}

Categories.propTypes = {
  list: PropTypes.array,
  selected: PropTypes.number,
  onSelect: PropTypes.func,
};

export default Categories;