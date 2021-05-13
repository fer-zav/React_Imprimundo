import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CartProvider} from '../src/context/cartContext'

ReactDOM.render(
  <React.StrictMode>
    <CartProvider value={[]}>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
