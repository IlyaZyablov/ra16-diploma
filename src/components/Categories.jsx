import PropTypes from 'prop-types';

function Categories({ list, selected, onSelect }) {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
          <a
            data-id={0}
            className={`nav-link${selected === 0 ? ' active' : ''}`}
            href="#!"
            onClick={onSelect}
          >
            Все
          </a>
        </li>
      {list.map(elem =>
        <li className="nav-item" key={elem.id}>
          <a
            data-id={elem.id}
            className={`nav-link${selected === elem.id ? ' active' : ''}`}
            href="#!"
            onClick={onSelect}
          >
            {elem.title}
          </a>
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