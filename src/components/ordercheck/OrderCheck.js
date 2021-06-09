import './OrderCheck.css';
import CartIcon from '../cartwidget/img_208967.png';
import {getFireStore} from '../../firebase';
import {Link} from 'react-router-dom';
import {useState} from 'react';

export const OrderCheck = () =>{
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");

    const handleSearch = (evt) => {
        evt.preventDefault();
        if (/^[0-9A-Fa-f]{0,11}$/i.test(evt.target.value)){
            setSearch(evt.target.value);
        }
        return;
    }

    const handleLoading = async (evt) => {
        setLoading(true);
        const db = getFireStore();
        const orderCode = document.getElementById("orderCode").value;
        const orderCollection = db.collection("orders") // eslint-disable-line no-unused-vars
        .where("orderId", "==", orderCode)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 0){
                setLoading(false);
                setOrder("error");
                return;
            }
            setOrder(querySnapshot.docs.map((doc) => {
                setLoading(false);
                return {...doc.data()};
            }));
        })
        .catch((err) => {
            console.error(`Firestore error: ${err}`);
        });
        return
    }

    return(
        <div className='OrderCheck'>
            <div className="searchContainer">
                <input id="orderCode" type="text" value={search} onChange={(e) => {return handleSearch(e)}} placeholder="Ingresa tu # de orden"/>
                <button onClick={(e) => {return handleLoading(e)}}>Buscar Orden</button>
            </div>
            {
                loading
                ? <div className="loadingMessage">
                    <br />
                    <p>Cargando pedido... <span className="loadingIcon"><img src={CartIcon} className="loadingCartIcon" alt="loadingCart" /></span></p>
                </div>
                : order === ""
                    ? <></>
                    : order === "error"
                        ? <p className="orderError">Id de Orden Invalida!</p>
                        : <div className="orderContainer">
                            <div className="orderDetails">
                                <div className="buyerList">
                                    <div className="listHeaders">
                                        <p>Nombre:</p>
                                        <p>eMail:</p>
                                        <p>Telefono:</p>
                                    </div>
                                    <div className="listValues">
                                        <p>{order[0].buyer.name}</p>
                                        <p>{order[0].buyer.email}</p>
                                        <p>{order[0].buyer.phone}</p>
                                    </div>
                                </div>
                                <div className="orderList">
                                    <div className="listHeaders">
                                        <p>Fecha: </p>
                                        <p>Coste total: </p>
                                        <p>Id de la Orden: </p>
                                    </div>
                                    <div className="listValues">
                                        <p>{new Date(Number(order[0].date.seconds + "000")).toLocaleDateString()}</p>
                                        <p><b>${order[0].total}</b></p>
                                        <p>{order[0].orderId}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="products">
                                {
                                    order[0].items.map((item) => {
                                        return(
                                            <ul className="productItem" key={item.docId}>
                                                <Link to={`/products/${item.id}`}>
                                                    <li>{item.name}</li>
                                                    <li><img className="imgPreview" alt={item.id} src={item.imageUrl} /></li>
                                                </Link>
                                                <li>Cantidad: {item.quantity}</li>
                                                <li>Precio unitario: ${item.price}</li>
                                                <li>Subtotal: ${item.price * item.quantity}</li>
                                            </ul>
                                        );
                                    })
                                }
                            </div>
                    </div>
                }
        </div>
    );
}
