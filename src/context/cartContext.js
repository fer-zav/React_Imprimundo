import {createContext, useState} from 'react'

export const CartContext = createContext([]);

// export const CartProvider = CartContext.Provider;

export const CartProvider = ({defaultValue=[], children}) => {
    const [cart, setCart] = useState(defaultValue);
    const [quantity, setQuantity] = useState(0);

    const getItem = (id) => {
        return cart.find((obj) => obj.id === id);
    }

    const isInCart = (id) => {
        return id === undefined ? undefined : getItem(id) !== undefined
    }

    const addItem = (item, quantity) => {
        if (isInCart(item)){
            console.log("Repeated item, not adding...");
            return;
        }
        setCart([...cart, item]);
        setQuantity(quantity)
    }

    const removeItem = (itemId) => {
        return isInCart(itemId) ? cart.splice(cart.indexOf(itemId), cart.indexOf(itemId)) : undefined;
    }

    const clear = () => {
        setCart(defaultValue);
        return;
    }

    return(
        <CartContext.Provider value={{cart, quantity, isInCart, addItem, removeItem, clear, cartSize: cart.length}}>
            {children}
        </CartContext.Provider>
    );
}
