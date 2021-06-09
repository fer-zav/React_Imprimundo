import './Landing.css';
import {RandomItemList} from '../components/randomItemList/RandomItemList';

export const Landing = () => (
    <div className='Landing'>
        <div className="landingTitle">Bienvenido al eCommerce!</div>
        <br />
        <div className="explainText">
            Algunos articulos (aleatorios) que podrian interesarte de <span className="landingEmphasis">Imprimundo3D...</span>
        </div>
        <RandomItemList />
    </div>
);
