import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/section.module.css'
import Product from '../components/Product'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';

import axios from 'axios'


const Section = ({category, numberOfProducts}) => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?category=${category}`)


        setProducts(res.data)

      } catch (error) {

      }
    }

    getProducts()
   

  }, [])

 
const games = products

  const [showedProducts, setShowedProducts] = useState([]);

  useEffect(() => {
    setShowedProducts(games.slice(0, numberOfProducts));
  }, [products]);

  const [startIndex, setStartIndex] = useState(numberOfProducts);
  const productsRef = useRef(null);



  const showMoreProducts = () => {

    const moreProducts = games.slice(startIndex, startIndex + 5);
    setShowedProducts((prevState) => [...prevState, ...moreProducts]);
    setStartIndex(startIndex + 5);

  };


  const hideProducts = () => {

    if (productsRef.current) {
      const topOffset = productsRef.current.offsetTop;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

    setShowedProducts(games.slice(0, numberOfProducts));
    setStartIndex(numberOfProducts);
  };




  return (

    <div className={styles.Container} ref={productsRef}>
      <h2 className={styles.SectionTitle}>{category}</h2>

      <div className={styles.Products}>

        {showedProducts.map((game, index) => {
          return (

            <Product data={game} key={index} />


          )

        })}

</div>
        {startIndex < games.length && startIndex < 15 ? (
          <button className={`${styles.SectionButton} ${styles.SectionButton_ShowMore}`} onClick={() => showMoreProducts()}><p>Pokaż więcej</p> <IoIosArrowDown size="2rem" className={styles.SectionButtonIcon} /></button>

        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <button className={`${styles.SectionButton} ${styles.SectionButton_Hide}`} onClick={() => hideProducts()}> <IoIosArrowUp size="4rem" className={styles.SectionButtonIcon} /></button>
            <button className={`${styles.SectionButton} ${styles.SectionButton_ShowAll}`} > <Link to={`/products/${category}`}>Wszystkie z <span style={{ fontWeight: '900' }}>{category}</span></Link> </button>
          </div>
        )}

     


    </div>


  )
}

export default Section