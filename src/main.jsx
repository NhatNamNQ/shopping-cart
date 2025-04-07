import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Cards from './pages/Cards'
import SingleCard from './pages/SingleCard'
import { CartProvider } from './context/CartContext'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />

      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'cards/series/:seriesQuery',
        element: <Cards />
      },
      {
        path: `cards/:cardId`,
        element: <SingleCard />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  </StrictMode>,
)
