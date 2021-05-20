import './Item.css';
import {Link} from 'react-router-dom';

export const Item = ({item}) =>(
    <div className="item-container">
        <p className="propsText">
            <Link to={`/product/${item.id}`}>
                <img src={item.imageUrl} alt={item.name} className="productImg" />
            </Link>
            Nombre: {item.name}<br />
            Descripcion: {item.description}<br />
            Precio: <Link to={`/product/${item.id}`}>Ver mas...</Link>
        </p>
    </div>
);
