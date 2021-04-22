import './App.css';
import {NavBar} from './components/navbar/NavBar';
import {ItemListContainer} from './components/itemlistcontainer/ItemListContainer';

function App() {
  const color = "red"

  return (
    <div className="App">
      <header className="App-header">
        <p>Imprimundo eShop</p>
        <NavBar />
        <ItemListContainer color={color}/>

      </header>
    </div>
  );
}

export default App;
