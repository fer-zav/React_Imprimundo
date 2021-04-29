import './ItemList.css';
import {Item} from '../item/Item';
import React, {useState} from "react";

export const ItemList = (props) => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        await new Promise(() => {
            setTimeout(()=>{
                setProducts([
                    {id: "imprFrag", name: "Impresion Fragil", description: "Una impresion 3d muy fragil..."},
                    {id: "imprFuert", name: "Impresion Fuerte", description: "Impresion 3d demasiado dura, devolver"},
                    {id: "imprJusta", name: "Impresion Justa", description: "Ah!, La impresion que estaba buscando!"},
                ]);
                console.log("me parece que esto se sigue ejecutando... infinitamente...");
            }, 2500);
        });
    }

    getProducts().then((result) =>{
         console.log(`result: ${result}`);
    }, (reject) => {
          console.log(`ERROR, ${reject}`);
    })
    return(
        <div>
            {products.map(product => console.log(`product.id: ${product.id}, props.item.id: ${props.item.id}, rel: ${product.id === props.item.id}`))}
            {products.map(product => <Item product={product.id === props.item.id}/>)}
        </div>
    );
}
