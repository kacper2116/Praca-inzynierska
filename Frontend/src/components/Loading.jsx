import React from 'react'
import styles from '../styles/loading.module.css'


const Loading = ({size}) => {
    return (

            <div className={styles.Loading} style = {{width:`${size}rem`,height:`${size}rem`}}></div>
    )
}

export default Loading