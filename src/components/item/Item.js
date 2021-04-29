import './Item.css';

export const Item = (props) => {
    const item = props.product;
    return(
        <div>
            <div>
                <p>Id: {item.id}
                Nombre: {item.name}
                Descripcion: {item.description}
                Stock: {item.stock}</p>
            </div>
        </div>
    )
}