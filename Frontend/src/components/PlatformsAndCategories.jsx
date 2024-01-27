import React, { useState } from 'react'
import Platforms from './Platforms'
import Categories from './Categories'
import styles from '../styles/platformsAndCategories.module.css'


const PlatformsAndCategories = () => {


    const [selectedItem, setSelectedItem] = useState('platforms')

    const selectChange = (item) => {
        setSelectedItem(item)

    }

    return (
        <div className={styles.Container}>

            <div className = {styles.Wrapper}>

                <div className = {`${styles.Platforms} ${selectedItem === 'platforms' ? styles.Active : ''}`} onClick={() => selectChange('platforms')}>
                    <h1>Platforms</h1>

                </div>

                <div className = {`${styles.Platforms} ${selectedItem === 'genres' ? styles.Active :''}`} onClick={() => selectChange('genres')}>
                    <h1>Genres</h1>
                </div>

            </div>

            <div style={{display:'flex', justifyContent:'center'}}>

                {selectedItem === 'platforms' ? (
                    <Platforms />
                ) : (
                    <Categories />
                )}

            </div>

        </div>
    )
}

export default PlatformsAndCategories