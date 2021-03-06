import './CartWidget.css';
import CartIcon from './img_208967.png';
import {CartContext} from '../../context/cartContext';
import {Link} from 'react-router-dom';
import {useContext} from 'react';

export const CartWidget = () => {
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);

    return(
        <>
            <div className='CartWidget'>
                {
                    cart.length > 0
                    ? <Link to="/cart" className="link">
                        <span className="cartQuantity">[{cart.map((item) => {return Number(item.quantity)}).reduce((a, b) => {return a + b})}]</span>
                    </Link>
                    : <></>
                }
                &nbsp;
                <Link to="/cart" className="link">
                    <img className="cartIcon" src={CartIcon} alt="cart" />
                </Link>
                &nbsp;
                {
                    cart.length > 0
                    ? <a href="/" title="vaciar carrito?" onClick={(e) => {e.preventDefault(); console.log(cart); return cartFuncs.clean()}}>❌</a>
                    : <></>
                }
            </div>
        </>
    );
}
