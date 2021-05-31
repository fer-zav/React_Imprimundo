import './OrderConfirm.css';
import {useState, useContext} from 'react';
import {CartContext} from '../../context/cartContext';
import {useParams} from 'react-router';
import firebase from 'firebase/app';
import {getFireStore} from '../../firebase';
import {Link} from 'react-router-dom';

export const OrderConfirm = () => {
    // consts & funcs
    const [buyerName, setBuyerName] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const {cart} = useContext(CartContext);
    const cartFuncs = useContext(CartContext);
    const orderId = useParams().orderId;

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
            default:
                break;
        }
        return evt.target.value;
    }

    // creating the order
    const db = getFireStore();
    const userInfo = {name: buyerName, phone: buyerPhone, email: buyerEmail}
    const newOrder = {
        buyer: userInfo,
        items: cart,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        total: cart.length > 0 ? cart.map((i) => {return i.price * i.quantity}).reduce((a,b) => a + b) : 0,
        orderId: orderId
    }

    // submit button (mostly boilerplate)
    const handleSubmit = (evt) => {
        if (buyerName && buyerPhone && buyerEmail){
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
                        console.log("compra exitosa!");
                    } else {
                        outOfStock.push({...docSnapshot.data(), docId: docSnapshot.id});
                        console.log(`${newOrder.items[idx].name} no tiene mas stock...`);
                    }
                });

                // submit batch
                if (outOfStock.length === 0){
                    await batch.commit()
                    .then((r) => {
                        console.log("data subida!");
                        return r;
                    });
                }
            })();

            // create & write orders to firebase
            const ordersRef = db.collection("orders").doc();
            ordersRef.set(newOrder)
            .then((docRef) => {
                console.log(`Documento creado! docRefId: ${docRef}`);
            })
            .catch((err) => {
                console.log("ERROR: ");
                console.log(err);
            });

            // finally, clean cart
            cartFuncs.clean();
        } else {
            alert("Please provide a valid name, phone AND email address!");
        }
    }

    // so, we deliver accordingly ")

    if (/^[0-9A-F]{5,11}$/i.test(orderId) && orderId.length === 11) {
        return(
            <div className="orderContainer" key={1}>
                {
                    cart.length > 1
                    ? (() => {return(
                        <form>
                            <div className="inputFields" key={2}>
                                <input type="text" value={buyerName} name="buyerName" placeholder="buyerName" required onChange={(e) => {return handleInput(e)}} />
                                <input type="text" value={buyerPhone} name="buyerPhone" placeholder="buyerPhone" required onChange={(e) => {return handleInput(e)}} />
                                <input type="email" value={buyerEmail} name="buyerEmail" placeholder="buyerEmail" required onChange={(e) => {return handleInput(e)}} />
                            </div>
                            <br />
                            <div>
                                <button className="buttonImportant" type="button" onClick={(e) => {handleSubmit(e)}}>Comprar</button>
                                <button className="buttonNotImportant" type="reset">Cancelar</button>
                            </div>
                        </form>
                    )})()
                    : <div key={3}>
                        <h1>Gracias por tu compra!</h1>
                        <br />En breve nos pondremos en contacto!
                        <br /><Link to="/">Ir al Inicio</Link>
                    </div>
                }

                {
                    cart.length > 0
                    ? cart.map((item) => {return(
                        <>
                            <div key={item.id} className="productDisplay">
                                <br />
                                <div>
                                    <p>{item.name}</p>
                                    <div>id: {item.id}</div>
                                    <div>cat: {item.category.join(", ")}</div>
                                    <div>docid: {item.docId}</div>
                                    <div>precio: ${item.price}</div>
                                    <div>quant: {item.quantity}</div>
                                </div>
                                <img src={item.imageUrl} alt={item.name} title={item.name} className="imgProduct" />
                                <br />
                            </div>
                            <hr style={{"width": "50%", "margin": "auto"}} />
                        </>
                    )})
                    : <></>
                }
            </div>
        )
    }else{ // for invalid/forged orderId's
        console.log("orderID not found!")
        return(
            <h1 key={4}>Invalid Order ID!</h1>
        );
    }
}
