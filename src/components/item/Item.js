import './Item.css';

export const Item = (props) => {
    const item = props.product;
    return(
        <div>
            <div>
                {console.log(props)}
                {console.log(item)}
                <p>Id: {item.id}
                Nombre: {item.name}
                Descripcion: {item.description}
                Stock: {item.stock}</p>
            </div>
        </div>
    )
}