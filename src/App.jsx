// react router
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// components
import Header from './components/Header';
import MainPage from './components/MainPage';
import CatalogCard from './components/CatalogCard';
import Catalog from './components/Catalog';
import About from './components/About';
import Contacts from './components/Contacts';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/catalog/:id' element={<CatalogCard />} />
        <Route path='/catalog' element={
          <main className="container">
            <div className="row">
              <div className="col">
                <Catalog />
              </div>
            </div>
          </main>
        } />
        <Route path='/about' element={<About />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
