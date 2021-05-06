import './Landing.css';
import {ItemListContainer} from '../components/itemlistcontainer/ItemListContainer';

export const Landing = () => (
    <div className='Landing'>
        <h1>Bienvenido al sitio de eCommerce!</h1>
        <br />
        <div>
            <code>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum omnis rem ipsum ab.
                Quidem recusandae fuga distinctio ad. Sapiente eveniet explicabo in quae nostrum culpa
                unde provident quaerat perspiciatis consectetur tempora quam architecto magnam cumque
                dolorum aliquid earum, dignissimos esse nam commodi. Ut esse blanditiis nobis.
                Voluptatum eaque ratione odit dolorum eum consequuntur id quas veritatis blanditiis
                expedita, praesentium, sint ex nam, ipsa aliquam omnis quia animi veniam. Saepe pariatur
                expedita impedit provident. Incidunt, aut ab! Provident asperiores quia eveniet.
            </code>
        </div>
        <br />
        <ItemListContainer />
    </div>
);
