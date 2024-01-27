import React, { useState } from 'react'
import styles from '../styles/slider.module.css'
import { slides } from '../data'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const Slider = ({ data }) => {

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1)
    }

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1)
    }



    return (
        <div className={styles.Container}>
            <MdNavigateBefore className={`${styles.Arrow} ${styles.LeftArrow}`} onClick={prevSlide} />

            {data.map((item, index) => {

                return <img src={item.url} key={index} className={slide === index ? styles.Slide : `${styles.Slide} ${styles.HiddenSlide}`}></img>

            })}

            <MdNavigateNext className={`${styles.Arrow} ${styles.RightArrow}`} onClick={nextSlide} />

            <span className={styles.Dots}>
                {data.map((_, index) => {
                    return <button key={index} onClick={() => setSlide(index)} className={slide === index ? styles.Dot : `${styles.Dot} ${styles.InactiveDot}`}></button>
                })}
            </span>
        </div>
    )
}

export default Slider