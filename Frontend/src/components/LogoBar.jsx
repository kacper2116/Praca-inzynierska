import React from 'react'
import styles from '../styles/logoBar.module.css'
import Logo from '../img/Logo.png'

const LogoBar = () => {
  return (
    <div className={styles.Container}>
      <a href='Home'><img className={styles.Logo} src={Logo}></img></a>
    </div>
  )
}

export default LogoBar