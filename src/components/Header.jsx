// react router
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img srcSet="../src/assets/img/header-logo.png" alt="Bosa Noga" />
            </a>
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
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
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