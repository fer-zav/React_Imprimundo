import './App.css';
import {NavBar} from './components/navbar/NavBar';
import {ItemListContainer} from './components/itemlistcontainer/ItemListContainer';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>Imprimundo eShop</p>
        <NavBar />
        <ItemListContainer />
      </header>
    </div>
  );
}

export default App;
