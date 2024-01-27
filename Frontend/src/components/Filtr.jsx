import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/filtr.module.css'
import RangeSlider from './RangeSlider'
import MultiSelectList from './MultiSelectList';


const categories = ['RPG', 'Action', 'Fantasy', 'TPP', 'FPS'];
const platforms = ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox series X', 'Switch'];
const languages = ['Polish', 'English', 'German', 'Spanish', 'Portugese', 'Japan'];



const Filtr = ({handleFilters}) => {


  return (

    <div className = {styles.Container}>

        <div className = {styles.FilterSection}>
            <div className = {styles.Price}>
                <h2>Price</h2>
                <RangeSlider name = {"price"} functionSetFilter = {handleFilters} />
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Category}>
           
            <MultiSelectList name = {"tags"} listItems={categories} functionSetFilter = {handleFilters} />
               
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Platform}>
           
            <MultiSelectList name = {"platforms"} listItems={platforms} functionSetFilter = {handleFilters} />
               
            </div>
        </div>

        <div className = {styles.FilterSection}>
            <div className = {styles.Laungage}>
           
            <MultiSelectList name = {"languages"} listItems={languages} functionSetFilter = {handleFilters}/>
               
            </div>
        </div>



    </div>
  )
}

export default Filtr