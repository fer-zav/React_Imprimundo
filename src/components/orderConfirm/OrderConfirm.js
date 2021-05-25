import './OrderConfirm.css';
import {useState, useContext} from 'react';
import {CartContext} from '../../context/cartContext';
import {useParams} from 'react-router';
import {getFireStore} from '../../firebase/index'

export const OrderConfirm = () => {
    const id = useParams();
    // const [someVar, setSomeVar] = useState([]);
    const {cart} = useContext(CartContext);
    console.log(id)
    console.log(id.orderId)

    const db = getFireStore();
    const orders = db.collection("orders");
    // const newOrder = {
    //     buyer: userInfo,
    //     items: cart,
    //     date: firebase.firestore.Timestamp.fromDate(new Date()),
    //     total: price()
    // }

    // orders.add(newOrder)
    // .then(({id}) => {
    //     setOrderId(id);
    // })
    // .catch((err) => {
    //     setError(err);
    // })
    // .finaly(() => {
    //     setLoading(false);
    // });

    var docRef = db.collection("items").doc()

    return(
        <div className="orderContainer">
            {
                cart.length > 0
                ? cart.map((item) => {return (
                    <div>
                        <p>{item.name}</p>
                        <div>cat: {item.category.join(", ")}</div>
                        <div>desc: {item.description}</div>
                        <div>docid: {item.docId}</div>
                        <div>id: {item.id}</div>
                        <div>imgurl: {item.imageUrl}</div>
                        <div>init: {item.initial}</div>
                        <div>$: {item.price}</div>
                        <div>quant: {item.quantity}</div>
                        <div>stock: {item.stock}</div>
                        <div>URM: {item.urlRefModel}</div>
                        <br />
                        <hr />
                    </div>
                )})
                : <></>
            }
        </div>
    )
}
// "category": "(3) […]",
// "description": "Super Mario... Steampunk!",
// "id": "steampunk-mario",
// "imageUrl": "https://files.cults3d.com/uploaders/14518040/illustration-file/74606f9f-3c8d-4243-851f-eee5fa2ed1ca/IMG_0959.jpeg",
// "initial": 1,
// "name": "SteamPunk Mario",
// "price": 2000,
// "quantity": 1
// "stock": 11,
// "urlRefModel": "https://cults3d.com/es/modelo-3d/variado/steampunk-mario-stl",
