import './ItemListContainer.css';
import {ItemList} from '../itemlist/ItemList';

export const ItemListContainer = () => {
    const prodsAttrs = [
            {item: "imprFrag"},
            {item: "imprJusta"},
            {item: "imprFuert"}
        ]
    return(
        <div className='ItemListContainer'>
            {prodsAttrs.map(prod => {
                return(
                    <div className="countDiv" key={prod.item}>
                        <ItemList item={prod.item} key={prod.item} />
                    </div>
                )})}
        </div>
    );
}
