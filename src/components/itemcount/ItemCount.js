import React, {useState} from 'react';
import "./ItemCount.css";

export const ItemCount = (props) => {
    const [stock, initial, countId] = [parseInt(props.stock), parseInt(props.initial), props.countId];
    const [quantity, setQuantity] = useState(initial);
    const [btnTargetPlus, btnTargetMinus] = [document.getElementsByClassName("ctrlAdd")[countId], document.getElementsByClassName("ctrlRem")[countId]];

    const onRemove = () => {
        if ((quantity === stock) && Array.from(btnTargetPlus.classList).indexOf("deactivated") > -1 ){btnTargetPlus.classList.toggle("deactivated");}
        if ((quantity < initial) && Array.from(btnTargetMinus.classList).indexOf("deactivated") < 0 ){btnTargetMinus.classList.toggle("deactivated");}
        if (quantity >= initial){return(setQuantity(quantity - 1));}
        return;
    }
    const onAdd = () => {
        if ((quantity < initial) && Array.from(btnTargetMinus.classList).indexOf("deactivated") > -1 ){btnTargetMinus.classList.toggle("deactivated");}
        if ((quantity === stock) && Array.from(btnTargetPlus.classList).indexOf("deactivated") < 0 ){btnTargetPlus.classList.toggle("deactivated");}
        if (quantity < stock){return(setQuantity(quantity + 1));}
        return;
    }

    return(
        <div>
            <br />
            <div className="item-group">
                <div className="input-group-prepend">
                    <button className="btnControl ctrlRem" type="button" onClick={() => {onRemove(quantity)}}>-</button>
                </div>
                <input className="stockField" value={quantity} onChange={() => {parseInt(quantity)}}/>
                <div className="input-group-append">
                    <button className="btnControl ctrlAdd" type="button" onClick={() => {onAdd(quantity)}}>+</button>
                </div>
            </div>
            <p className="stockStats"><span>Stock: {stock}</span><br /><span>Orden minima: {initial}</span></p>
        </div>
    )
}
