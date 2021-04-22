import './ItemListContainer.css';

export const ItemListContainer = (props) => {
    const placeholder = "[Lorem Ipsum]"

    return(
    <div className='ItemListContainer'>
            <p>{placeholder}</p>
            <p>{props.color}</p>
        </div>
    )
}
