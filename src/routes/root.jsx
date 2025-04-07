import { createContext, useState } from 'react'
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Cart } from '../components/Cart';

export const CartContext = createContext();


function Root() {
  const [isCartActive, setIsCartActive] = useState(false);
  const [cartData, setCartData] = useState([]);

  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  function handleAddItemToCart(newItem) {
    let isItemInCart = false;
    const modifiedData = cartData.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }

      return item;
    })

    if (isItemInCart) setCartData(modifiedData);
    else {
      newItem.quantity = 1;
      setCartData([newItem, ...cartData]);
    }
  }

  function handleAdjustCardQuantity(id, quantity, action) {
    if (quantity === 1 && action === "decrement") {
      removeItemFromCart(id);
      return;
    }

    const updatedData = cartData.map((card) => {
      if (card.id === id) card.quantity += action === 'increment' ? 1 : -1;
      return card;
    })

    setCartData(updatedData);
  }

  const removeItemFromCart = (id) =>
    setCartData(cartData.filter((item) => item.id !== id));

  return (
    <CartContext.Provider value={handleAddItemToCart}>
      {isCartActive &&
        <Cart
          onClose={toggleIsCartActive}
          cards={cartData}
          onDelete={removeItemFromCart}
          onAdjust={handleAdjustCardQuantity} />}
      <Header onOpenCart={toggleIsCartActive} />
      <Outlet />
    </CartContext.Provider>
  )
}

export default Root;
