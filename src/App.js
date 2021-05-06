import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {NavBar} from './components/navbar/NavBar';
import {Landing} from './pages/Landing';
import {Novedades} from './pages/Novedades';
import {ItemListContainer} from './components/itemlistcontainer/ItemListContainer';
import {ItemDetailContainer} from './components/itemdetailcontainer/ItemDetailContainer';
import {Footer} from './components/footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p><Link exact to="/">Imprimundo eShop</Link></p>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/products">
              <ItemListContainer />
            </Route>
            <Route path="/product/:productId">
              <ItemDetailContainer />
            </Route>
            <Route path="/novedades">
              <Novedades />
            </Route>
          </Switch>
          <Footer />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
