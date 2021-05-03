import './ItemList.css';
import {Item} from '../item/Item';
import React, {useState, useEffect} from "react";

export const ItemList = (props) => {
    const [products, setProducts] = useState([]);
    const datas = [
        {id: "imprFrag", name: "Impresion Fragil", description: "Una impresion 3d muy fragil..."},
        {id: "imprFuert", name: "Impresion Fuerte", description: "Impresion 3d demasiado dura, devolver"},
        {id: "imprJusta", name: "Impresion Justa", description: "Ah!, La impresion que estaba buscando!"},
    ];
    useEffect(() =>{
        const getProducts = (async () => { // eslint-disable-line no-unused-vars
            await new Promise(() => {
                setTimeout(()=>{setProducts(datas);}, 2500);
            });
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            {products.map(product => {
                return product.id === props.item ? <Item key={product.id} product={product} /> : null
            }
            )}
        </div>
    );
}
