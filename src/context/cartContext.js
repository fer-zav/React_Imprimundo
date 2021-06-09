import {createContext, useState} from 'react'

export const CartContext = createContext([]);
export const CartProvider = ({defaultValue=[], children}) => {

    const [cart, setCart] = useState(defaultValue);
    const [quantity, setQuantity] = useState(0);
    const getItem = (id) => {
        return cart.find((obj) => obj.id === id);
    }

    const isInCart = (id) => {
        return id === undefined ? undefined : getItem(id) !== undefined;
    }

    const addItem = (item, quantity) => {
        if (isInCart(item.id)){
            console.log("Repeated item, not adding...");
        } else if (quantity < 1) {
            console.log("Can't add 0 products...");
            } else {
                setCart([...cart, {...item, quantity: quantity}]);
                setQuantity(quantity);
            }
        return 0;
    }

    const removeItem = (itemId) => {
        return isInCart(itemId) ? setCart(cart.filter((item) => {return item.id !== itemId})) : undefined;
    }

    const clean = () => {
        setCart(defaultValue);
        return;
    }

    return(
        <CartContext.Provider value={{cart, quantity, isInCart, getItem, addItem, removeItem, clean}}>
            {children}
        </CartContext.Provider>
    );
}
