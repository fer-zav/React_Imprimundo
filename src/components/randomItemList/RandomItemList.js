import './RandomItemList.css';
import CartIcon from '../cartwidget/img_208967.png';
import {getFireStore} from '../../firebase';
import {Item} from '../item/Item';
import {useState, useEffect} from "react";

export const RandomItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const slugify = (s) => {
            return s.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        }
        const shuffle = (arr) => {
            let curId = arr.length;
            while (0 !== curId) {
                let randId = Math.floor(Math.random() * curId);
                curId -= 1;
                [arr[curId], arr[randId]] = [arr[randId], arr[curId]];
            }
            return arr;
        }
        const db = getFireStore();
        const itemCollection = db.collection("items");
        itemCollection.get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 0){
                console.log("No results!");
            }
            setItems(shuffle(querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: slugify(doc.data().name), docId: doc.id};
            })).slice(0,4)); // 4 shuffled items
            setLoading(false);
        })
        .catch((err) => {
            console.error(`Firestore error: ${err}`);
        });
    }, []);

    return(
        <div className="countDiv">
            {
                loading
                ? <div className="randomItemLoading">Cargando productos... <span className="loadingIcon"><img src={CartIcon} className="itemDetailLoadingCartIcon" alt="loadingCart" /></span></div>
                : items.map((item) => {
                    return(
                        <Item key={item.id} item={item} />
                    )
                })
            }
        </div>
    );
}
