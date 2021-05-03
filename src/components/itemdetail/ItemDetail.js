import './ItemDetail.css';

export const ItemDetail = (props) => {
    const item = props.item;
    return(
        <div>
            <span className="titleDetail">Nombre: {item.name}</span><br />
            <img src={item.img} alt={item.name} />
            <br />
            <p>Descripcion: {item.description}</p><br />
            <span className="priceDetail">Precio: {item.price}</span><br />
            <br />
        </div>
    )
}
