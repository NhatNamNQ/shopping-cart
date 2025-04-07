import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Cart } from '../components/Cart';
import { useCart } from '../context/CartContext';

function Root() {
  const cartContext = useCart();

  return (
    <>
      {cartContext.isCartActive &&
        <Cart
          onClose={cartContext.toggleIsCartActive}
          cards={cartContext.cartItems}
          onDelete={cartContext.removeItemFromCart}
          onAdjust={cartContext.handleAdjustCardQuantity} />}
      <Header onOpenCart={cartContext.toggleIsCartActive} />
      <Outlet />
    </>
  )
}

export default Root;
