import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Cart } from '../components/Cart';
import { useCart } from '../context/CartContext';

function Root() {
  const { isCartActive, toggleIsCartActive } = useCart();

  return (
    <>
      {isCartActive && <Cart />}
      <Header onOpenCart={toggleIsCartActive} />
      <Outlet />
    </>
  )
}

export default Root;
