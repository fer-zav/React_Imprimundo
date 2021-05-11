import "./ItemCount.css";

export const ItemCount = ({item, add, rem, changeFunc, quantity, key, onAdd}) => {
    const [stock, initial] = [parseInt(item.stock), parseInt(item.initial)];

    return(
        <div className="item-count">
            <br />
            <div className="item-group">
                <div className="input-group-prepend">
                    <button className="btnControl ctrlRem" type="button" onClick={rem}>-</button>
                </div>
                <input key={key} className="stockField" value={quantity} onChange={(e) => {changeFunc(e); console.log(e)}} />
                <div className="input-group-append">
                    <button className="btnControl ctrlAdd" type="button" onClick={add}>+</button>
                </div>
            </div>
            <p className="stockStats"><span>Stock: {stock}</span><br /><span>Orden minima: {initial}</span></p>
        </div>
    );
}
