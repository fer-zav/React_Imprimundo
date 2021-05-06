import './ItemDetailContainer.css';
import React, {useState, useEffect} from "react";
import {ItemDetail} from '../itemdetail/ItemDetail';
import {useParams} from 'react-router-dom';


export const ItemDetailContainer = () => {
    const productId = useParams()
    const [items, setItems] = useState([]);
    const datas = [
        {id: "imprFrag", name: "Impresion Fragil", description: "Una impresion 3d muy fragil...", img: "https://cdn.shopify.com/s/files/1/2122/3145/products/Flexable_Filament_twist_f2f7f14e-c9ba-4ba5-b2fa-6ff1cd374bef_900x.jpg?v=1499971140", price: "$300", stock: "6", initial: "1", countId: "0"},
        {id: "imprJusta", name: "Impresion Justa", description: "Ah!, La impresion que estaba buscando!", img: "https://www.uv.es/recursos/fatwirepub/ccurl/163/550/impresion-3D.jpg", price: <b>$600</b>, stock: "3", initial: "1", countId: "1"},
        {id: "imprFuert", name: "Impresion Fuerte", description: "Impresion 3d demasiado dura, devolver", img: "https://i.ytimg.com/vi/A50Vv6E2lc8/hqdefault.jpg", price: "$900", stock: "9", initial: "1", countId: "2"},
    ];
    useEffect(() =>{
        const getItems = async () => {
            await new Promise(() => {
                setTimeout(()=>{setItems(datas);}, 10);
            });
        }
    getItems()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {items.map(item => {
                return item.id === productId.productId ? <ItemDetail key={item.id} item={item} /> : null
            }
            )}
        </div>
    );
}
