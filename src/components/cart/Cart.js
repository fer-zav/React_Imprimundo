import {CartContext} from "../../context/cartContext"
import {useContext} from 'react';
import {Link} from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);

    return(
        <>
            {
                cart.length > 0
                ? <div className="totalPrice">
                    <div className="endPurchase">
                        <Link to={`/orders/order:${Array.from(new Date().valueOf().toString(16).toUpperCase()).reverse().join("").toString()}`}>Finalizer Compra</Link>
                    </div>
                    <div>
                        Total: $<b>{cart.map((i) => {return i.price * i.quantity}).reduce((a,b) => a + b)}</b>
                    </div>
                </div>
                : <></>
            }
            {
                cart.length > 0
                ? cart.map((item) => {return (
                    <div className="productContainer">
                        <Link to={`/product/${item.id}`}>
                            <span className="productTitle">{item.name}</span>
                        </Link>
                        <div key={item.id} className="dataContainer">
                            <Link to={`/product/${item.id}`}>
                                <p><img className="imgItemCart" src={item.imageUrl} alt={item.name} /></p>
                            </Link>
                            <div className="itemDescript">
                                <p>Precio Unitario: {item.price}</p>
                                <p>Cantidad pedida: {item.quantity}</p>
                                <p>Subtotal: {item.price * item.quantity}</p>
                                {/* placeholder para los botones de agregar y quitar del product in cart! */}
                                <a href="/" className="iconRemove" onClick={(e) => {e.preventDefault(); cartFuncs.removeItem(item.id); e.stopPropagation();}}>❌</a>{/* en tu cara fontAwesome! */}
                            </div>
                        </div>
                    </div>
                )})
                : <h1>Carrito Vacio</h1>
            }
            <div className="keepShopping">
                <Link to="/products">Seguir comprando!</Link>
            </div>
        </>
    );
}
