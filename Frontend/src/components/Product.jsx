import React from 'react'
import styles from '../styles/product.module.css'
import { Link } from 'react-router-dom'

const Product = ({ data }) => {

	
	return (

		<Link to = {`/product?id=${data._id}`}>	
		

		<div className={styles.Container}>

			<div className={styles.Img} style={{ backgroundImage: `url(${data.coverImg})` }} />
			<div className={styles.Info}>
				<div className={styles.Info__Title}>{data.title}</div>
				<div className={styles.Info__Price}>{data.price} PLN</div>
			</div>

			
		</div>
		</Link>
	)
}

export default Product