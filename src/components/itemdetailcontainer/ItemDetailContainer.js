import './ItemDetailContainer.css';
import React, {useState, useEffect} from "react";
import {ItemDetail} from '../itemdetail/ItemDetail';
import {useParams} from 'react-router-dom';
import {getFireStore} from '../../firebase';


export const ItemDetailContainer = () => {
    const productId = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const slugify = (s) => {
            return s.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
        }
        const db = getFireStore();
        const itemCollection = db.collection("items");
        itemCollection.get()
        //.where("id", "==", productId) //deberia traer 1 solo, pero el slug se agrega DESPUES de pedir todos los productos...
        .then((querySnapshot) => {
            if (querySnapshot.size === 0){
                console.log("No results!");
            }
            setItems(querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: slugify(doc.data().name), docId: doc.id};
            }))
        })
        .catch((err) => {
            console.error(`Firestore error: ${err}`);
        });
    }, []);

    return(
        <div>
            {console.log(items)}
            {items.map((item) => {
                return item.id === productId.productId ? <ItemDetail key={item.id} item={item} /> : null
            })}
        </div>
    );
}
