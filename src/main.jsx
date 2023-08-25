import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/style.css';
import '../node_modules/izitoast/dist/css/izitoast.min.css';
import '../node_modules/izitoast/dist/js/izitoast.min.js';

// store
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
);
