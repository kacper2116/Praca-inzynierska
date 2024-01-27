import React, { useEffect, useState } from 'react'
import styles from '../styles/platforms.module.css'

import { FaComputer } from "react-icons/fa6";
import { SiPlaystation3 } from "react-icons/si";
import { SiPlaystation4 } from "react-icons/si";
import { SiPlaystation5 } from "react-icons/si";
import { FaXbox } from "react-icons/fa";

import { SiNintendoswitch } from "react-icons/si";

import { userRequest } from '../requestMethods'
import { Link } from "react-router-dom";

const Platforms = () => {

  const [platforms, setPlatforms] = useState(null)

  useEffect(() => {
    const getPlatforms = async () => {
      try {
        const res = await userRequest.get('/platforms')

        setPlatforms(res.data)

      } catch (error) {

      }
    }

    getPlatforms()

  }, [])



  const setPlatformIcon = (key) => {
    switch (key) {
      case 'PC': return <FaComputer />; break;
      case 'PS3': return <SiPlaystation3 />; break;
      case 'PS4': return <SiPlaystation4 />; break;
      case 'PS5': return <SiPlaystation5 />; break;
      case 'Xbox 360': return <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FaXbox /> <span style={{ fontSize: '0.8rem', fontWeight: '600', margin: '0.3rem', textAlign: 'center' }}>360</span></span>; break;
      case 'Xbox One': return <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FaXbox /> <span style={{ fontSize: '0.8rem', fontWeight: '600', margin: '0.3rem', textAlign: 'center' }}>ONE</span></span>; break;
      case 'Xbox Series X': return <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FaXbox /> <span style={{ fontSize: '0.8rem', fontWeight: '600', margin: '0.3rem', textAlign: 'center' }}>Series X</span></span>; break;
      case 'Switch': return <SiNintendoswitch />; break;
    }
  }

  console.log(platforms)

  return (
    <div className={styles.Container}>

      <div className={styles.Platforms}>


        {platforms && platforms.map((platform) => (
          <Link to={`/products/${platform.name}`}>
            <div className={styles.Platform} key={platform.name}>
              {setPlatformIcon(platform.name)}
            </div>
          </Link>
        ))}

        <div className={styles.Platform}>{setPlatformIcon('PC')}</div>
        <div className={styles.Platform}>{setPlatformIcon('PC')}</div>
        <div className={styles.Platform}>{setPlatformIcon('PC')}</div>
        <div className={styles.Platform}>{setPlatformIcon('PC')}</div>



      </div>


    </div>
  )
}

export default Platforms