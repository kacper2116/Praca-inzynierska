import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ListProducts from '../components/ListProducts'
import Filtr from '../components/Filtr'
import Sort from '../components/Sort'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams, setSearchParams, useParams } from "react-router-dom";




const Products = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { param } = useParams();


  
  const [searchParams, setSearchParams] = useSearchParams()

  const pageNumber = () => {

    if(searchParams.get('page')){
      return searchParams.get('page')
    }
    
  }
 
  
  let category = decodeURIComponent(location.pathname.split('/')[2]);
 
  if(category === 'undefined' || category ==='')category = 'All Games'

  const [filters, setFilters] = useState({})

  const functionSetFilter = (name, value) => {

    setFilters({
      ...filters,
      [name]: value
    })


    const currentSearchParams = searchParams
    const page = currentSearchParams.get('page')
    
    if(page > 1){

      currentSearchParams.set('page', 1)
      setSearchParams(currentSearchParams);   
    }

  }

 
  useEffect(() => {

    if (Object.keys(filters).length > 0) {

      const currentSearchParams = searchParams;
      

      for (const [key, value] of Object.entries(filters)) {

        
        value.length > 0 ? currentSearchParams.set(key, JSON.stringify(value)) :currentSearchParams.delete(key);
          

      }

      setSearchParams(currentSearchParams);   
   
    }



  },[filters])


 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      
        <Navbar/>
       

        <div style={{display:'flex', width:'80%'}}>
          
          <Filtr handleFilters = {functionSetFilter}/>

           <div style={{display:'flex', flexDirection:'column', alignItems:'center',width:'80%'}}>
          
            <Sort handleSort = {functionSetFilter}/>
          
            <ListProducts searchParams = {searchParams} />
            </div> 
           

        </div>

        <Footer/>


    </div>
  )
 
}

export default Products