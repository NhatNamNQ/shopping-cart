import { useState } from 'react'
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Cart } from '../components/Cart';


function Root() {
  const [isCartActive, setIsCartActive] = useState(false);
  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  return (
    <>
      {isCartActive && <Cart onClose={toggleIsCartActive}/>}
      <Header onOpenCart={toggleIsCartActive}/>
      <Outlet/>
    </>
  )
}

export default Root;
