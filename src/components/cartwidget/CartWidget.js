import './CartWidget.css';

export const CartWidget = () => {
    const cart= "https://cdn.onlinewebfonts.com/svg/img_208967.png";

    return(
        <div className='CartWidget'>
            <ul>
                <li><img className="cartIcon" src={cart} alt="cart" /></li>
            </ul>
        </div>
    )
}
