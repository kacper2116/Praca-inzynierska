import React, { useEffect, useState } from 'react'
import Payment from '../components/Payment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Checkout = () => {

  const [searchParams] = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const clientSecret = searchParams.get('payment_intent_client_secret');
  const redirectStatus = searchParams.get('redirect_status');

  const userToken = useSelector(state => state.user.currentUser);
  const cart = useSelector((state) => state.cart)
  const guest = useSelector((state) => state.guest.guestInfo)

  const [error, setError] = useState(null)

  const [guestOrUser, setguestOrUser] = useState('')

  useEffect(() => {

    const handleCheckout = async () => {

      try {

        if (userToken) {

   
          const response = await axios.post('http://localhost:5000/api/checkout', {
            paymentIntentId: paymentIntent,
            products: cart.products,

          },
            {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }

          )

          if (response.data.success) {
            console.log("success")
            setguestOrUser('user')

          } else console.log("failure")

        } else {
          const response = await axios.post('http://localhost:5000/api/checkout/guest', {
            paymentIntentId: paymentIntent,
            guestEmail: guest.email,
            products: cart.products
          })

          if (response.data.success) {
            console.log("success")
            setguestOrUser('guest')
          } else console.log("failure")
        }

      } catch (error) {
        console.error('Błąd podczas przekazywania danych do serwera:', error);
        setError(error)
      }
    }

    handleCheckout();

  }, [])



  const navigate = useNavigate()



  return (
   
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Navbar />
      {guestOrUser === 'user' &&
        <div>
          <button onClick={()=>navigate('/orders')}>Przejrzyj swoje zamówienia</button>
        </div>
      }

      {guestOrUser === 'guest' &&
        <div>
          Klucz został wysłany na adres email {guest.email}
        </div>
      }


      <Footer />
    </div>
  )
}

export default Checkout