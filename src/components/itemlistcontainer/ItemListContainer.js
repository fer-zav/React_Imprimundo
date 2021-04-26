import './ItemListContainer.css';
import {ItemCount} from '../itemcount/ItemCount'

export const ItemListContainer = () => (
    <div className='ItemListContainer'>
        <ItemCount stock="6" initial="1" countId="0" />
        <ItemCount stock="10" initial="1" countId="1" />
        <ItemCount stock="2" initial="1" countId="2" />
    </div>
)
