import './ItemListContainer.css';
import {ItemCount} from '../itemcount/ItemCount';
import {ItemList} from '../itemlist/ItemList';
import {ItemDetailContainer} from '../itemdetailcontainer/ItemDetailContainer';

export const ItemListContainer = () => (
    <div className="ParentDiv">
        <div className='ItemListContainer'>
            <ItemList item="imprFrag" />
            <ItemCount stock="6" initial="1" countId="0" />
            <ItemList item="imprJusta" />
            <ItemCount stock="2" initial="1" countId="1" />
            <ItemList item="imprFuert" />
            <ItemCount stock="10" initial="1" countId="2" />
        </div>
        <br />
        <hr />
        <br />
        <div className="ItemDetailContainer">
            <ItemDetailContainer item="imprFrag" />
            <ItemDetailContainer item="imprJusta" />
            <ItemDetailContainer item="imprFuert" />
        </div>
    </div>
)
