import './ItemList.css';
import {Item} from '../item/Item';
import React, {useState, useEffect} from "react";

export const ItemList = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const getProducts = async () => {
            await new Promise(() => {
                setTimeout(()=>{
                    setProducts([
                        {id: "imprFrag", name: "Impresion Fragil", description: "Una impresion 3d muy fragil..."},
                        {id: "imprFuert", name: "Impresion Fuerte", description: "Impresion 3d demasiado dura, devolver"},
                        {id: "imprJusta", name: "Impresion Justa", description: "Ah!, La impresion que estaba buscando!"},
                    ]);
                }, 2500);
            });
        }
        getProducts().then((result) =>{
            console.log(`result: ${result}`);
       }, (reject) => {
             console.log(`ERROR, ${reject}`);
       })
    }, [])

    return(
        <div>
            {products.map(product => {
                return product.id === props.item ? <Item product={product} /> : null
            }
            )}
        </div>
    );
}
