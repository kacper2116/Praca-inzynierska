import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Product from '../components/Product'
import Section from '../components/Section'
import Footer from '../components/Footer'
import { slides } from '../data'
import { games } from '../data'
import LogoBar from '../components/LogoBar'
import PlatformsAndCategories from '../components/PlatformsAndCategories'

const Home = () => {


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black'}}>
      <Navbar />
      <Slider data={slides} />
      <Section category="Best Games" numberOfProducts={5} />
      <Section category="All Games" numberOfProducts={10} />
      
      <PlatformsAndCategories/>
     
      <LogoBar />
      <Footer />

    </div>

  )
}

export default Home