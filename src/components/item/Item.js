import './Item.css';

export const Item = (props) => {
    const item = props.product;
    return(
        <div>
            <div>
                <p>
                    Id: {props.id}
                    Nombre: {item.name}
                    Descripcion: {item.description}
                </p>
            </div>
        </div>
    )
}
