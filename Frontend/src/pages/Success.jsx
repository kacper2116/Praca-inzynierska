import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import axios from 'axios';


const Success = () => {

    const location = useLocation()
    const data = location.state.stripeData
    console.log(data)
    const cart = useSelector((state) => state.cart)

    const currentUser = useSelector((state) => state.user.currentUser)
    const [orderId, setOrderId] = useState(null)
   

    useEffect(() => {

    
        const createOrder = async() => {

         

            try {
       
                const res = await axios.post('http://localhost:5000/api/orders', {
                    userId: currentUser._id,
                    orderValue: 2, 
                    paymentMethod: 'card'
                    
                })

                

                setOrderId(res.data._id)
            } catch (error) {
                
            }
        }
        data && createOrder()
    },[cart, data, currentUser])


  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {orderId
      ? `Order has been created successfully. Your order number is ${orderId}`
      : `Successfull. Your order is being prepared...`}
    <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
  </div>
  )
}

export default Success