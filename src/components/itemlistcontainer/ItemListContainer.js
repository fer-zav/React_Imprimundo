import './ItemListContainer.css';
import {ItemList} from '../itemlist/ItemList';

export const ItemListContainer = ({item}) => {
    return(
        <div className='ItemListContainer'>
            <div className="countDiv">
                <ItemList key={item} />
            </div>
        </div>
    );
}
