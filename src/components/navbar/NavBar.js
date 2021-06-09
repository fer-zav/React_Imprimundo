import './NavBar.css';
import {CartWidget} from '../cartwidget/CartWidget';
import {Link} from 'react-router-dom';

export const NavBar = () => (
    <div className='NavBar'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Productos</Link></li>
            <li><Link to='/orderCheck'>Revisa tu Orden</Link></li>
        </ul>
        <CartWidget />
    </div>
);
