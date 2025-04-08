import { useState, createContext, useContext } from "react";

const CartContext = createContext();

function useCart() {
    return useContext(CartContext);
}

function CartProvider({ children }) {
    const [isCartActive, setIsCartActive] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const toggleIsCartActive = () => setIsCartActive(!isCartActive);

    function handleAddItemToCart(newItem) {
        let isItemInCart = false;
        const modifiedData = cartItems.map((item) => {
            if (item.id === newItem.id) {
                isItemInCart = true;
                item.quantity += 1;
            }

            return item;
        })

        if (isItemInCart) setCartItems(modifiedData);
        else {
            newItem.quantity = 1;
            setCartItems([newItem, ...cartItems]);
        }
    }

    function handleAdjustCardQuantity(id, currQuantity, action) {
        if (currQuantity === 1 && action === "decrement") {
            removeItemFromCart(id);
            return;
        }

        const updatedData = cartItems.map((card) => {
            if (card.id === id) card.quantity += action === 'increment' ? 1 : -1;
            return card;
        })

        setCartItems(updatedData);
    }

    const removeItemFromCart = (id) =>
        setCartItems(cartItems.filter((item) => item.id !== id));

    const providerValues = {
        isCartActive,
        cartItems,
        removeItemFromCart,
        handleAddItemToCart,
        handleAdjustCardQuantity,
        toggleIsCartActive,
    }

    return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>
}

export {useCart, CartProvider}