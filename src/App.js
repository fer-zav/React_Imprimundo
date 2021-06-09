import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Cart} from './components/cart/Cart';
import {Footer} from './components/footer/Footer';
import {ItemDetailContainer} from './components/itemdetailcontainer/ItemDetailContainer';
import {ItemListContainer} from './components/itemlistcontainer/ItemListContainer';
import {Landing} from './pages/Landing';
import {NavBar} from './components/navbar/NavBar';
import {OrderCheck} from './components/ordercheck/OrderCheck';
import {OrderConfirm} from './components/orderConfirm/OrderConfirm';

function App() {

  return(
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p><Link to="/">Imprimundo eShop</Link></p>
          <NavBar />
        </header>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orderCheck">
            <OrderCheck />
          </Route>
          <Route path="/products/:productId">
            <ItemDetailContainer />
          </Route>
          <Route path="/products">
            <ItemListContainer />
          </Route>
          <Route path="/orders/order::orderId">
            <OrderConfirm />
          </Route>
          <Route path="/"> {/* si esta al fondo, NO necesita exact */}
            <Landing />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
