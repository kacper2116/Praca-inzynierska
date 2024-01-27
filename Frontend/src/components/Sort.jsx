import React, { useState, createContext, useEffect } from 'react'
import styles from '../styles/sort.module.css'
import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams, setSearchParams } from "react-router-dom";


const Sort = ({ handleSort }) => {


  const [isFiltered, setIsFiltered] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  
  const navigate = useNavigate()

  const options = [

    { value: 'Default', label: 'Default' },
    { value: 'Price ascending', label: 'Price ascending' },
    { value: 'Price descending', label: 'Price descending' },
    { value: 'Name A-Z', label: 'Name A-Z' },
    { value: 'Name Z-A', label: 'Name Z-A' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Newest' },
  ]

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleSort(["sort"], [selectedOption.value])

    const currentSearchParams = searchParams
    const page = currentSearchParams.get('page')

    if(page > 1){

      currentSearchParams.set('page', 1)
      setSearchParams(currentSearchParams);   
    }

  };

  

  const resetFilters = () => {

    const currentUrl = new URL(window.location.href);
    const urlSearchParams = currentUrl.searchParams;

    urlSearchParams.delete('price');
    urlSearchParams.delete('tags');
    urlSearchParams.delete('platforms');
    urlSearchParams.delete('languages');
    urlSearchParams.delete('sort');

    setIsFiltered(false)

    navigate(currentUrl.pathname + '?' + urlSearchParams.toString(), { replace: true });
    window.location.reload();

  }

 
  useEffect(() => {

    const params = searchParams;
    const sortParams = params.get('sort');


    if (params.has('price') || params.has('tags') || params.has('platforms') || params.has('languages') || params.has('sort')) setIsFiltered(true)
    else setIsFiltered(false)

    if (sortParams) {

      setSelectedOption({ value: JSON.parse(sortParams), label: JSON.parse(sortParams) })

    }else {
      setSelectedOption({})
    }

  }, [searchParams]);

  return (


    <div className={styles.Container}>
      <label htmlFor="sort">Sort by</label>
      <Select className={styles.Select} value={selectedOption} name='sort' id='sort' options={options} onChange={handleChange} />

      {isFiltered &&
        <button className={styles.ResetFilters} onClick={() => resetFilters()}>Resetuj filtry</button>
      }
    </div>



  )


}

export default Sort