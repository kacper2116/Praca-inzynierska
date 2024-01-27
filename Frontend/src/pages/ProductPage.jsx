import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Section from '../components/Section'
import Footer from '../components/Footer'
import LogoBar from '../components/LogoBar'
import ProductDetails from '../components/ProductDetails'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethods'
import { useSearchParams } from "react-router-dom";

const ProductPage = () => {

  
  const location = useLocation()
  const [searchParams] = useSearchParams();
  const[productId, setProductId] = useState(searchParams.get('id'))

  const [product, setProduct] = useState({})
  const [availablePlatforms, setAvailablePlatforms] = useState({})
  const [error, setError] = useState(false)


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get('/products/find/'+productId)
      
        if(response){
          setProduct(response.data.product)
          setAvailablePlatforms(response.data.availablePlatforms)

        }


      } catch (error) {
        setError(true)
      }
    }
    getProduct()
   
  },[])
  
  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black' }}>
      <Navbar />
      
       <ProductDetails product={product} availablePlatforms={availablePlatforms}/>
      <Footer />
    </div>
  )
}

export default ProductPage