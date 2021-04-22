import './NavBar.css';
import {CartWidget} from '../cartwidget/CartWidget';

export const NavBar = () => (
    <div className='NavBar'>
        <ul>
            <li><a href='/home'>Home</a></li>
            <li><a href='/novedades'>Novedades</a></li>
            <li><a href='/mightremovelater'>Placeholder</a></li>
            <li><a href='/contacto'>Contacto</a></li>
        </ul>
        <CartWidget />
    </div>
);
