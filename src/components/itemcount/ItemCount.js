import "./ItemCount.css";
import {useState, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {CartContext} from "../../context/cartContext";

export const ItemCount = ({item, add, rem, changeFunc, quantity, key, onAdd}) => {
    const params = useParams();
    const [stock, initial] = [parseInt(item.stock), parseInt(item.initial)];
    const [enableCart, setEnableCart] = useState(false);
    const {cart} = useContext(CartContext); // eslint-disable-line no-unused-vars
    const cartFuncs = useContext(CartContext);
    const itemId = params.productId;

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
            <p className="stockStats"><span>Stock: {cartFuncs.isInCart(itemId) ? Number(stock) - Number(cartFuncs.getItem(itemId).quantity) : stock}</span><br /><span>Orden minima: {initial}</span></p>
            <br />
            <>
                {enableCart ? <Link to='/carrito' >Ver el carrito</Link> : <button type="button" onClick={(e) => {e.preventDefault(); setEnableCart(!enableCart); cartFuncs.addItem(item, quantity)}} value="Agregar al carrito">Agregar al carrito</button>}
            </>
        </div>
    );
}
