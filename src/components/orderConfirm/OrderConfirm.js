import './OrderConfirm.css';
import {CartContext} from '../../context/cartContext';
import {getFireStore} from '../../firebase';
import {Link} from 'react-router-dom';
import {useHistory, useParams} from 'react-router';
import {useState, useContext} from 'react';
import firebase from 'firebase/app';

export const OrderConfirm = () => {
    // consts & funcs
    const [buyerName, setBuyerName] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [buyerEmail2, setBuyerEmail2] = useState("");
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);
    const orderId = useParams().orderId;
    const history = useHistory();

    // handle buyer inputs
    const handleInput = (evt) => {
        switch (evt.target.name) {
            case "buyerName":
                setBuyerName(evt.target.value);
            break;
            case "buyerPhone":
                setBuyerPhone(evt.target.value);
            break;
            case "buyerEmail":
                setBuyerEmail(evt.target.value);
            break;
            case "buyerEmail2":
                setBuyerEmail2(evt.target.value);
            break;
            default:
                break;
        }
        return evt.target.value;
    }

    // if cancel, go back to landing page
    const resetForm = () => {
        let path = "/";
        history.push(path);
    }

    // creating the order
    const db = getFireStore();
    const userInfo = {name: buyerName, phone: buyerPhone, email: buyerEmail};
    const newOrder = {
        buyer: userInfo,
        items: cart,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        total: cart.length > 0 ? cart.map((i) => {return i.price * i.quantity}).reduce((a,b) => a + b) : 0,
        orderId: orderId
    };

    // submit button (mostly boilerplate)
    const handleSubmit = (evt) => {
        if (buyerName && buyerPhone && buyerEmail && buyerEmail2){
            if (buyerEmail === buyerEmail2){
                (async () => { //have to create a self-calling, async function in order to avoid errors
                    const itemsToUpdate = db.collection("items")
                    .where(firebase.firestore.FieldPath.documentId(), "in", newOrder.items.map((i) => {return i.docId}));

                    const query = await itemsToUpdate.get();
                    const batch = db.batch();
                    // check for out of stock items & create batch modify of stock in selected items
                    const outOfStock = [];
                    query.docs.forEach((docSnapshot, idx) => {
                        if (docSnapshot.data().stock >= newOrder.items[idx].quantity){
                            batch.update(docSnapshot.ref, {stock: docSnapshot.data().stock - newOrder.items[idx].quantity});
                        } else {
                            outOfStock.push({...docSnapshot.data(), docId: docSnapshot.id});
                            console.log(`${newOrder.items[idx].name} no tiene mas stock...`);
                        }
                    });

                    // submit batch
                    if (outOfStock.length === 0){
                        await batch.commit()
                        .then((r) => {
                            return r;
                        });
                    }
                })();

                // create & write orders to firebase
                const ordersRef = db.collection("orders").doc();
                ordersRef.set(newOrder)
                .then((docRef) => {
                    console.log(`${docRef}`);
                })
                .catch((err) => {
                    console.log("ERROR: ");
                    console.log(err);
                });
                // finally, clean cart
                cartFuncs.clean();

            }else{ // check coinciding emails!
                alert(`${buyerEmail} is different from ${buyerEmail2}!`);
            }
        } else {
            alert("Please provide a valid name, phone AND email address!");
        }
    }

    // so, we deliver accordingly ")
    if (/^[0-9A-F]{5,11}$/i.test(orderId) && orderId.length === 11) {
        return(
            <div className="orderContainer" key={1}>
                {
                    cart.length > 0
                    ? (() => {
                        return(
                            <form>
                                <div className="inputFields" key={2}>
                                    <div key={3}>
                                        <label>Nombre</label>
                                        <label># telefono</label>
                                        <label>eMail</label>
                                        <label>Repetir eMail</label>
                                    </div>
                                    <div key={4}>
                                        <input type="text" value={buyerName} name="buyerName" placeholder="Nombre" required onChange={(e) => {return handleInput(e)}} />
                                        <input type="text" value={buyerPhone} name="buyerPhone" placeholder="Telefono" required onChange={(e) => {return handleInput(e)}} />
                                        <input type="email" value={buyerEmail} name="buyerEmail" placeholder="eMail" required onChange={(e) => {return handleInput(e)}} />
                                        <input type="email" value={buyerEmail2} name="buyerEmail2" placeholder="Repetir eMail" required onChange={(e) => {return handleInput(e)}} />
                                    </div>
                                </div>
                                <br />
                                <div className="buttonsField" key={5}>
                                    <button className="buttonImportant" type="button" title="Finalizar Compra!" onClick={(e) => {handleSubmit(e)}}>Comprar</button>
                                    <button className="buttonNotImportant" type="reset" title="Ir al inicio" onClick={(e) => {resetForm(e)}}>Cancelar</button>
                                </div>
                            </form>
                        )
                    })()
                    : <div key={6}>
                        <h1>Gracias por tu compra!</h1>
                        <br />En breve nos pondremos en contacto!
                        <p>Id (puede reverse la orden <Link to="/orderCheck">aqui</Link> con el siguiente codigo: <b>{orderId}</b>)</p>
                        <br /><Link to="/">Ir al Inicio</Link>
                    </div>
                }
                {
                    cart.length > 0
                    ? <div className="productsContainer" key={7}>
                        {
                            cart.map((item) => {return(
                                <>
                                    <div key={item.id} className="productDisplay">
                                        <br />
                                        <div>
                                            <div>{item.name}</div>
                                            <div>Precio: ${item.price}</div>
                                            <div>Cantidad Pedida: {item.quantity}</div>
                                            <div>Subtotal: ${item.price * item.quantity}</div>
                                        </div>
                                        <img src={item.imageUrl} alt={item.name} title={item.name} className="imgProduct" />
                                        <br />
                                    </div>
                                    <hr className="horizSpacer" />
                                </>
                            )})
                        }
                    </div>
                    : <></>
                }
                {
                    cart.length > 0
                    ? <div className="orderTotal" key={8}>
                        Total: ${cart.map((item) => {return Number(item.quantity)}).reduce((a, b) => {return a + b}) * cart.map((item) => {return Number(item.price)}).reduce((a, b) => {return a + b})}
                    </div>
                    : <></>
                }
            </div>
        )
    }else{ // for invalid/forged orderId's
        return(
            <h1 key={9}>Invalid Order ID!</h1>
        );
    }
}
