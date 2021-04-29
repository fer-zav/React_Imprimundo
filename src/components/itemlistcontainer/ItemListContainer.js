import './ItemListContainer.css';
import {ItemCount} from '../itemcount/ItemCount';
import {ItemList} from '../itemlist/ItemList';

export const ItemListContainer = () => (
    <div className='ItemListContainer'>
        <ItemList item="imprFrag"/>
        <ItemCount stock="6" initial="1" countId="0" />
        <ItemList item="imprFuert"/>
        <ItemCount stock="10" initial="1" countId="1" />
        <ItemList item="imprJusta"/>
        <ItemCount stock="2" initial="1" countId="2" />
    </div>
)
