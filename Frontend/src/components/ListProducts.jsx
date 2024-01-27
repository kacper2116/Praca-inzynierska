import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import styles from '../styles/listProducts.module.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import Loading from './Loading'
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useSearchParams, setSearchParams, useParams } from "react-router-dom";
import PageNavigation from '../components/PageNavigation'

const ListProducts = ({ searchParams }) => {

      const [products, setProducts] = useState([]);
      const [totalFilteredProducts, setTotalFilteredProducts] = useState('')
      const [totalPages, setTotalPages] = useState('')
      const { param } = useParams();

      const [loading, setLoading] = useState(true);

      useEffect(() => {

            //Pozyskanie produktów
            const getProducts = async () => {

                  try {

                        const res = await axios.get(param 
                              ? `http://localhost:5000/api/products/${param}?${searchParams}`
                              : `http://localhost:5000/api/products?${searchParams}`
                              
                        )

                        setProducts(res.data.filteredProducts)
                        setTotalFilteredProducts(res.data.totalFilteredProducts)
                        setTotalPages(res.data.totalPages)


                  } catch (error) {
                        console.error("Bład pobierania danych",)
                  } finally {
                        setLoading(false);
                  }


            }

            getProducts()


      }, [searchParams])

      return (

            <div className={styles.Container}>

                  <h2>{param}</h2>
                  <h4 style={{ marginBottom: '2rem' }}>{totalFilteredProducts} wyników</h4>
                  {/* <h2 className={styles.SectionTitle}>{filters.text}</h2> */}

                  <div>

                        {loading ? (
                              <Loading size={'6'} />
                        ) : (
                              products.length > 0 ? (

                                    <>
                                          <div className={styles.Products}>
                                                {products.map((game, index) => {
                                                      return (

                                                            <Product data={game} key={index} />

                                                      )

                                                })}
                                          </div>

                                          {totalPages > 1 &&
                                                <PageNavigation totalFilteredProducts={totalFilteredProducts} totalPages={totalPages} />
                                          }

                                    </>






                              ) : (
                                    <div className={styles.noProductsFound}>Nie znaleziono produktów <RiEmotionUnhappyLine /></div>
                              )


                        )}

                  </div>
            </div>

      )

}

export default ListProducts