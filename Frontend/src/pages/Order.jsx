import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../styles/order.module.css'
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Order = () => {

    const { orderId } = useParams();
    const [orderData, setOrderData] = useState()
    const userToken = useSelector(state => state.user.currentUser);
    const [productKey, setProductKey] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);



    useEffect(() => {

        const getOrder = async () => {

            if (orderId) {

                const response = await axios.get(`http://localhost:5000/api/orders/order/${orderId}`, {

                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setOrderData(response.data)
            }

        }

        getOrder()


    }, [orderId])

    const openModal = (productId) => {
        setSelectedProductId(productId);
        setModalIsOpen(true);

    };

    const closeModal = () => {
        setSelectedProductId(null);
        setProductKey(null)
        setModalIsOpen(false);
    };


    const getKey = async (productId) => {

        try {
            const response = await axios.post(`http://localhost:5000/api/orders/order/${orderId}/receive/${productId}`,

                null,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            const productKey = response.data.key

            setProductKey(productKey)
            console.log(productKey)

        } catch (error) {

        }
    }





    if (orderData && orderData.products) {

        console.log(orderData.products)

        return (

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>

                <Navbar />
                <div className={styles.Container}>

                    {orderData &&
                        <div className={styles.Order}>

                            <div className={styles.OrderDetails}>
                                <h3 className={styles.Order_Id}>Order ID: {orderData._id}</h3>
                                <h4 className={styles.Order_Date}>Date: {new Date(orderData.createdAt).toLocaleString()}</h4>
                            </div>

                            <div className={styles.Order_Info}>
                                <div>Products</div>
                                <div>Status</div>
                            </div>

                            <div className={styles.Order_Products}>


                                {orderData.products.map((product => {

                                    return (
                                        <div className={styles.Order_Product} >

                                            <div className={styles.Order_Product_Details}>
                                                <div className={styles.Wrapper}>
                                                    <div className={styles.Order_Product_Img}>
                                                        <img src='https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png'></img>
                                                    </div>

                                                    <div>
                                                        <h3 className={styles.Order_Product_Details_Title}>{product.title} {product.platform}</h3>
                                                        <h3 className={styles.Order_Product_Details_Price}>{product.price} {orderData.currency}</h3>
                                                        <h3 className={styles.Order_Product_Details_Developer}>{product.publisher}</h3>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className={styles.Order_Status}>

                                                {product.received === true ? "Received" : "Ready to collect"}

                                            </div>


                                            <div className={styles.Product_Key}>
                                                <button onClick={() => openModal(product._id)}>{product.received === true ? 'Show key' : 'Receive key'}</button>

                                            </div>


                                        </div>
                                    )

                                }))}

                            </div>


                        </div>

                    }

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Product key"
                        className={styles.Modal}
                        overlayClassName={styles.Modal_Overlay}
                    >
                        <div style={{ width: '100%' }}>
                            <div className={styles.CloseButton} onClick={closeModal}>
                                <MdClear />
                            </div>
                            <p>Receive key? </p>
                            <div style={{ display: 'flex', width: '50%' }}>
                                <button onClick={() => getKey(selectedProductId)}>Yes</button>
                                <button onClick={closeModal}>No</button>
                            </div>

                            {productKey &&
                                <span className={styles.Product_Key}>{productKey}</span>
                            }
                        </div>
                    </Modal>


                </div>

                <Footer />
            </div>


        )

    }
}

export default Order