import "./ItemCount.css";
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { CartProvider } from "../../context/cartContext";

export const ItemCount = ({item, add, rem, changeFunc, quantity, key, onAdd}) => {
    const [stock, initial] = [parseInt(item.stock), parseInt(item.initial)];
    const [enableCart, setEnableCart] = useState(false)

    return(
        <div className="item-count">
            <br />
            <div className="item-group">
                <div className="input-group-prepend">
                    <button className="btnControl ctrlRem" type="button" onClick={rem}>-</button>
                </div>
                <input key={key} className="stockField" value={quantity} onChange={(e) => {changeFunc(e)}} />
                <div className="input-group-append">
                    <button className="btnControl ctrlAdd" type="button" onClick={add}>+</button>
                </div>
            </div>
            <p className="stockStats"><span>Stock: {stock}</span><br /><span>Orden minima: {initial}</span></p>
            <br />
            {enableCart ?
            <Link to='/carrito' >Ver el carrito</Link>
            : <CartProvider>
                {/* no funciona, explota... */}
                <button type="button" onClick={() => {CartProvider.addItem(item, quantity); setEnableCart(!enableCart)}} value="Agregar al carrito">Agregar al carrito</button>
            </CartProvider>
            }
        </div>
    );
}
