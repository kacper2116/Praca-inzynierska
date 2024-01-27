import React, { useEffect, useState } from 'react'
import styles from '../styles/categories.module.css'

import { userRequest } from '../requestMethods'
import { Navigate, useNavigate } from 'react-router-dom'


const Categories = () => {

  const [categories, setCategories] = useState(null)
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };


  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await userRequest.get('/categories')

        setCategories(res.data)

      } catch (error) {

      }
    }

    getCategories()

  }, [])



  return (
    <div className={styles.Container}>

      <div className={styles.Categories}>


        {categories && categories.map((category) => (

        
          <div key={category.name} onClick={() => handleCategoryClick(category.name)}>
            <div className={styles.Category} key={category.name}>
              {category.name}
            </div>
          </div>
         
        ))}

      </div>


    </div>
  )
}

export default Categories