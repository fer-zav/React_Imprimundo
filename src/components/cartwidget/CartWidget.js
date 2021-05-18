import './CartWidget.css';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../../context/cartContext';
import CartIcon from './img_208967.png';


export const CartWidget = () => {
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);

    return(
        <>
            <div className='CartWidget'>
                {
                    cart.length > 0
                    ? <Link to="/carrito" className="link">
                        <span className="cartQuantity">({cart.map((item) => {return Number(item.quantity)}).reduce((a, b) => {return a + b})})</span>
                    </Link>
                    : <></>
                }
                <Link to="/carrito" className="link">
                    <img className="cartIcon" src={CartIcon} alt="cart" />
                </Link>
            {cart.length > 0 ? <a href="/" title="vaciar carrito?" onClick={(e) => {e.preventDefault(); console.log(cart); return cartFuncs.clean()}}>❌</a> : <div></div>}
            </div>
        </>
    );
}
