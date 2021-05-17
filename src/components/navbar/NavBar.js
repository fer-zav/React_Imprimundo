import './NavBar.css';
import {Link} from 'react-router-dom';
import {CartWidget} from '../cartwidget/CartWidget';

export const NavBar = () => (
    <div className='NavBar'>
        <ul>
            <li><Link to='/novedades'>Novedades</Link></li>
            <li><Link to='/products'>Productos</Link></li>
            <li><Link to='/contacto'>Contacto</Link></li>
            <li><Link to='/'>Home</Link></li>
        </ul>
        <CartWidget />
    </div>
);
