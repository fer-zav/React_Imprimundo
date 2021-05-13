import './ItemDetail.css';
import {useState} from 'react';
import {ItemCount} from '../itemcount/ItemCount';
import { CartProvider} from '../../context/cartContext';

export const ItemDetail = ({item}) => {
    const [quantity, setQuantity] = useState(item.initial);

    const onOptionChanged = (evt) => {
        let mode = evt.target.className.split(" ")[1]
        setQuantity(mode === "ctrlAdd" ? Number(quantity) + 1 : Number(quantity) - 1)
        evt.target.parentElement.parentElement.getElementsByClassName("stockField")[0].value = quantity;
    }

    const [btnTargetPlus, btnTargetMinus] = [document.getElementsByClassName("ctrlAdd")[0], document.getElementsByClassName("ctrlRem")[0]];
    const removeItem = (e) => {
        if ((quantity === Number(item.stock)) && Array.from(btnTargetPlus.classList).indexOf("deactivated") > -1 ){btnTargetPlus.classList.toggle("deactivated");}
        if ((quantity < item.initial) && Array.from(btnTargetMinus.classList).indexOf("deactivated") < 0 ){btnTargetMinus.classList.toggle("deactivated");}
        if (quantity >= item.initial){onOptionChanged(e);}
        return;
    }
    const addItem = (e) => {
        if ((quantity < item.initial) && Array.from(btnTargetMinus.classList).indexOf("deactivated") > -1 ){btnTargetMinus.classList.toggle("deactivated");}
        if ((quantity === Number(item.stock)) && Array.from(btnTargetPlus.classList).indexOf("deactivated") < 0 ){btnTargetPlus.classList.toggle("deactivated");}
        if (quantity < Number(item.stock)){onOptionChanged(e);}
        return;
    }

    return(
        <div className="item-detail-container">
            <div className="titleDetail">Nombre: {item.name}</div><br />
            <img src={item.img} alt={item.name} />
            <br />
            <p>Descripcion: {item.description}</p><br />
            <div className="priceDetail">Precio: {item.price}</div>
            <CartProvider>
                <ItemCount item={item} add={addItem} rem={removeItem} changeFunc={onOptionChanged} quantity={quantity} key={item.id} value="" />
            </CartProvider>
        </div>
    );
}
