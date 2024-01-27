import React, { useState, useRef } from 'react'
import styles from '../styles/imageGallery.module.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiMoreVertical } from 'react-icons/fi'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


const ImageGallery = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };


  const Modal = ({ onClose }) => {

    const goPrev = () => {

      setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % (data.length));

    }


    const goNext = () => {

      setCurrentIndex((prevIndex) => (prevIndex + 1) % (data.length));
    }


    return (
      <div className={styles.modal}>
        <div className={styles.LeftArrow} onClick={() => goPrev()}><HiOutlineChevronLeft /></div>
        <div className={styles.RightArrow} onClick={() => goNext()}><HiOutlineChevronRight /></div>
        <img src={data[currentIndex].img} alt="Image" />
        <span>{data[currentIndex].id}</span>
        <div className={styles.closeButton} onClick={onClose}><IoMdClose /></div>
      </div>
    );
  };


  let images = [];
  let moreImages = '';


  if (data.length > 5) {
    images = data.slice(0, 5)
    moreImages = 'ImageGallery_Img_More'

  } else {
    images = data;
    moreImages = 'ImageGallery_Img_More_Hide'
  }





  return (
    <div className={styles.ImageGallery_Container}>


      <div className={`${styles[moreImages]} ${styles.ImageGallery_Img_More_Left}`}><AiFillCaretLeft /></div>

      {images.map((item, index) => {

        return (

          <div className={styles.ImageGallery_Img}>

            <img key={index} src={item.img} onClick={() => openModal(item.img, index)} />
          </div>

        )
      })}


      <div className={`${styles[moreImages]} ${styles.ImageGallery_Img_More_Right}`}><AiFillCaretRight /></div>


      {selectedImage && (
        <Modal image={selectedImage} onClose={closeModal} />
      )}


    </div>



  )
}

export default ImageGallery