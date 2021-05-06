import './ItemDetail.css';
import {ItemCount} from '../itemcount/ItemCount';

export const ItemDetail = ({item}) => {
    return(
        <div className="item-detail-container">
            <div className="titleDetail">Nombre: {item.name}</div><br />
            <img src={item.img} alt={item.name} />
            <br />
            <p>Descripcion: {item.description}</p><br />
            <div className="priceDetail">Precio: {item.price}</div>
            <ItemCount stock={item.stock} initial={item.initial} countId={item.countId} value="" />
        </div>
    );
}
