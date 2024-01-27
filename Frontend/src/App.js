import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { Pay } from './components/Payment'
import { games } from './data'
import Success from './pages/Success'
import Payment from './components/Payment'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Order from './pages/Order'

const stripePromise = loadStripe("pk_test_51OFe18IwpyhMM9K7XISefWatZkYRa10kXTRN2ocEzo6s3LqsaK3ORRJgm7NfMQnW2AQx6f3kq2hziW5sDUGWMkbD00BeewkNAU");



function App() {

  const user = useSelector(state => state.user.currentUser);

  return (

    <Router>

      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />

        <Route path='/products' element={<Products />} />
        <Route path='/products/:param' element={<Products />} />
        <Route path='/product' element={<ProductPage />} />


        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
         <Route path = '/checkout' element = { <Checkout/>}/>
         <Route path = '/orders' element = { <Orders/>}/>
         <Route path = '/order/:orderId' element = { <Order/>}/>
          
      

      </Routes>

    </Router>


  )
}

export default App;
