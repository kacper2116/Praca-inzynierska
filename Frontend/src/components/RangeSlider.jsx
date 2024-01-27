import React, { useState, useEffect } from 'react';
import { Slider, Typography, TextField  } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSearchParams, setSearchParams } from "react-router-dom";

const RangeSlider = ({functionSetFilter}) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation();

    const sliderMin = 0;
    const sliderMax = 1000;

    const [priceRange, setPriceRange] = useState([sliderMin, sliderMax]);
    const [inputValues, setInputValues] = useState([sliderMin, sliderMax]);


    useEffect(() => {
   
      const priceFromUrl = searchParams.getAll('price')
 
      if(priceFromUrl.length > 0){

        setPriceRange(JSON.parse(priceFromUrl))
        setInputValues(JSON.parse(priceFromUrl));

        console.log(priceRange)
      
      }
  
  
    },[])

    
    useEffect(() => {
      
      setPriceRange(inputValues);
      
      const delay = setTimeout(() => {
        
        if(priceRange.toString() != [sliderMin, sliderMax].toString()){

          console.log(inputValues)
          functionSetFilter("price",inputValues)
        } 

  
      }, 300);
      
      return () => clearTimeout(delay);

     
    }, [inputValues]);
  
    const handleSliderChange = (_, newValue) => {

      setPriceRange(newValue);
      setInputValues(newValue); 
    };


    const handleInputChange = (index, event) => {
      const inputValue = event.target.value;
      const newValue = inputValue === '' ? '' : Number(inputValue);
      
    
      if (!isNaN(newValue) && newValue >= sliderMin && newValue <= sliderMax) {
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
      }

    };

      
    const handleBlur = () => {
      setPriceRange([Math.min(inputValues[0], inputValues[1]), Math.max(inputValues[0], inputValues[1])]);
    };
  
    return (
      <div style={{display:'flex', flexDirection:'column' }}>
        
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={sliderMin}
          max={sliderMax}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Min"
            variant="standard"
            value={inputValues[0]}
            onChange={(e) => {handleInputChange(0, e); }}
            onBlur={handleBlur}
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <TextField
            label="Max"
            variant="standard"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e)}
            onBlur={handleBlur}
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </div>
      </div>
    );
  };

  export default RangeSlider