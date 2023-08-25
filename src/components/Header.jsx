import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsList, updateTotalPrice } from '../store/cartSlice';
import { setSearchParams } from '../store/itemsSlice';

function Header() {
  const cartItems = useSelector(state => state.cart.list);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ show: false, value: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      if (localStorage.getItem('cart') !== null) {
        const parsedData = JSON.parse(localStorage.getItem('cart'));
        dispatch(setItemsList(parsedData));

        dispatch(updateTotalPrice());
      }
    }
  }, [cartItems]);

  const handleForm = evt => {
    if (evt._reactName === 'onSubmit') {
      evt.preventDefault();
    }

    if (formData.value.length === 0) {
      setFormData({ ...formData, show: !formData.show });
    } else {
      dispatch(setSearchParams(formData.value));

      setFormData({ show: false, value: '' });

      navigate('/catalog');
    }
  };

  const handleInputChange = evt => {
    setFormData({ ...formData, value: evt.target.value });
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img srcSet="../src/assets/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to='/'>Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/catalog'>Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/about'>О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/contacts'>Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleForm}></div>
                  <Link to='/cart'>
                    <div className="header-controls-pic header-controls-cart">
                      {cartItems.length > 0 &&
                        <div className="header-controls-cart-full">{cartItems.length}</div>
                      }
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                {formData.show &&
                  <form data-id="search-form" className="header-controls-search-form form-inline" onSubmit={handleForm}>
                    <input className="form-control" placeholder="Поиск" onChange={handleInputChange} />
                  </form>
                }
              </div>
            </div>
          </nav>
          <div className="banner">
            <img src="../src/assets/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;