import './ItemDetailContainer.css';
import CartIcon from '../cartwidget/img_208967.png';
import {getFireStore} from '../../firebase';
import {ItemDetail} from '../itemdetail/ItemDetail';
import {Link, useParams} from 'react-router-dom';
import {useState, useEffect} from "react";

export const ItemDetailContainer = () => {
    const productId = useParams().productId;
    const [items, setItems] = useState([]);
    const [checkId, setCheckId] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const slugify = (s) => {
            return s.trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        }
        setLoading(true);
        const db = getFireStore();
        const itemCollection = db.collection("items");
        itemCollection.get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 0){
                console.log("No results!");
            }
            let result = querySnapshot.docs.map((doc) => {return slugify(doc.data().name)});
            setCheckId(result.some((i) => {return i === productId}));
            setItems(querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: slugify(doc.data().name), docId: doc.id};
            }))
            setLoading(false);
        })
        .catch((err) => {
            console.error(`Firestore error: ${err}`);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {
                checkId
                    ? items.map((item) => {
                        return item.id === productId ? <ItemDetail key={item.id} item={item} /> : null
                    })
                    : loading
                        ? <h1>Cargando producto... <span className="loadingIcon"><img src={CartIcon} className="itemDetailLoadingCartIcon" alt="loadingCart" /></span></h1>
                        : <>
                            <h1 className="notFound">Producto no encontrado!</h1>
                            <Link to="/products">Seguir comprando</Link>
                        </>
            }
        </div>
    );
}
