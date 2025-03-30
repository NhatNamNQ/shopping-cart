import { useState } from 'react'
import { Header } from '../../components/Header';

function Root() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
    </>
  )
}

export default Root;
