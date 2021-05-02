import './CartWidget.css';
import CartIcon from './img_208967.png';

export const CartWidget = () => (
    <div className='CartWidget'>
        <ul>
            <li><img className="cartIcon" src={CartIcon} alt="cart" /></li>
        </ul>
    </div>
)
