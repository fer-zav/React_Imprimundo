import './Item.css';
import {Link} from 'react-router-dom';


export const Item = ({product}) =>(
    <div className="item-container">
        <p className="propsText">
            Nombre: {product.name}<br />
            Descripcion: {product.description}
        </p>
        <Link to={`/product/${product.id}`}>Ver mas...</Link>
        <div>
        </div>
    </div>
);
