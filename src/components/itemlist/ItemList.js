import './ItemList.css';
import {Item} from '../item/Item';
import React, {useState, useEffect} from "react";
import {getFireStore} from '../../firebase';

export const ItemList = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const slugify = (s) => {
            return s.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
        }
        const db = getFireStore();
        const itemCollection = db.collection("items");
        itemCollection.get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 0){
                console.log("No results!");
            }
            setItems(querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: slugify(doc.data().name)};
            }))
        })
        .catch((err) => {
            console.error(`Firestore error: ${err}`);
        })
    }, [])

    return(
        <>
            {
                items.map((item) => {
                    return (
                        <Item key={item.id} item={item} />
                    )
                })
            }
        </>
    );
}
