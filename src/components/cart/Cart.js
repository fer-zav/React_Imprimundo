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
                ? <div className="totalPrice">Total: $<b>{cart.map((i) => {return i.price * i.quantity}).reduce((a,b) => a + b)}</b></div>
                : <></>
            }
            {
                cart.length > 0
                ? cart.map((item) => {return (
                    <div className="productContainer">
                        <h1>{item.name}</h1>
                        <div key={item.id} className="dataContainer">
                            {console.log(item)}
                            <p><img className="imgItemCart" src={item.imageUrl} alt={item.name} /></p>
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
                : <p>Carrito Vacio</p>
            }
            <div className="keepShopping">
                <Link to='/products'>Seguir comprando!</Link>
            </div>
        </>
    );
}
