import './ItemDetailContainer.css';
import {ItemDetail} from '../itemdetail/ItemDetail';
import React, {useState, useEffect} from "react";

export const ItemDetailContainer = (props) => {
    const [items, setItems] = useState([]);
    const datas = [
        {id: "imprFrag", name: "Impresion Fragil", description: "Una impresion 3d muy fragil...", img: "https://cdn.shopify.com/s/files/1/2122/3145/products/Flexable_Filament_twist_f2f7f14e-c9ba-4ba5-b2fa-6ff1cd374bef_900x.jpg?v=1499971140", price: "$300"},
        {id: "imprJusta", name: "Impresion Justa", description: "Ah!, La impresion que estaba buscando!", img: "https://www.uv.es/recursos/fatwirepub/ccurl/163/550/impresion-3D.jpg", price: <b>$600</b>},
        {id: "imprFuert", name: "Impresion Fuerte", description: "Impresion 3d demasiado dura, devolver", img: "https://i.ytimg.com/vi/A50Vv6E2lc8/hqdefault.jpg", price: "$900"},
    ];
    useEffect(() =>{
        const getItems = async () => {
            await new Promise(() => {
                setTimeout(()=>{setItems(datas);}, 3500);
            });
        }
    getItems()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {items.map(item => {
                return item.id === props.item ? <ItemDetail key={item.id} item={item} /> : null
            }
            )}
        </div>
    );
}
