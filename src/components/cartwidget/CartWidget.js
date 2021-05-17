import './CartWidget.css';
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../../context/cartContext';
import CartIcon from './img_208967.png';


export const CartWidget = () => {
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);

    return(
        <div className='CartWidget'>
            <Link to="/carrito" className="link">
                <span className="cartQuantity">({cart.length})</span>
                <img className="cartIcon" src={CartIcon} alt="cart" />
            </Link>
            {cart.length > 0 ? <a href="/" onClick={(e) => {e.preventDefault(); console.log(cart); return cartFuncs.clean()}}>vaciar carrito?</a> : <div></div>}
        </div>
    );
}
