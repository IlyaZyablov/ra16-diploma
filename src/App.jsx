// react router
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Contacts from './components/Contacts';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/404' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
