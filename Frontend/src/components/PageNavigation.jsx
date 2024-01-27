import React, { useEffect, useState } from 'react'
import styles from '../styles/pageNavigation.module.css'

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";


const PageNavigation = ({ totalFilteredProducts, totalPages }) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const currentSearchParams = searchParams

    const [pageNumber, setPageNumber] = useState(currentSearchParams.get('page') ? parseInt(currentSearchParams.get('page')) : 1)

    let page = currentSearchParams.get('page') ? parseInt(currentSearchParams.get('page')) : 1

    const prevPage = () => {


        if (page > 1) {
            currentSearchParams.set('page', page - 1)
            setSearchParams(currentSearchParams)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }

    const nextPage = () => {

        if (page < totalPages) {
            currentSearchParams.set('page', page + 1)
            setSearchParams(currentSearchParams)

            window.scrollTo({ top: 0, behavior: 'smooth' });

        }


    }

    const firstPage = () => {

        if (page > 1) {

            currentSearchParams.set('page', 1)
            setSearchParams(currentSearchParams)

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }

    const lastPage = () => {

        if (page < totalPages) {

            currentSearchParams.set('page', totalPages)
            setSearchParams(currentSearchParams)

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div className={styles.Container}>


            <MdFirstPage className={page > 1 ? styles.Arrow : styles.Arrow_Disabled} onClick={() => firstPage()} />

            <IoIosArrowBack className={page > 1 ? styles.Arrow : styles.Arrow_Disabled} onClick={() => prevPage()} />


            <span>{page} / {totalPages}</span>

            <IoIosArrowForward className={page < totalPages ? styles.Arrow : styles.Arrow_Disabled} onClick={() => nextPage()} />

            <MdLastPage className={page < totalPages ? styles.Arrow : styles.Arrow_Disabled} onClick={() => lastPage()} />

        </div>
    )
}

export default PageNavigation