import React, { useEffect, useState } from 'react'
import styles from '../styles/productDetails.module.css'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { BsCartCheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ product, availablePlatforms }) => {

  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const [allPlatforms, setAllPlatforms] = useState(product.platforms)
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [availability, setAvailability] = useState(false)

  
  useEffect(() => {

    setAvailability(Object.keys(availablePlatforms).length > 0 ? true : false)
    if (product.platforms) setSelectedPlatform(Object.keys(availablePlatforms)[0]);

  }, [product])


  useEffect(() => {
    if (product.details) {
      {
        const rawDate = product.details.release_date;
        const parsedDate = new Date(rawDate);

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);
        setReleaseDate(formattedDate)
      }

    } else {

    }
  }, [product.details])



  const [showCartInfo, setShowCartInfo] = useState(false)

  const handlePlatformSelect = (platform) => {

    if (availablePlatforms[platform]) setSelectedPlatform(platform);
    
  };


  const addToCart = () => {

    document.body.classList.add('overlay-active');



    dispatch(
      addProduct({ ...product, quantity, selectedPlatform })
    )

    setShowCartInfo(true)
  }



  const AddedToCart = () => {

    const continueShopping = () => {
      setShowCartInfo(false);
      document.body.classList.remove('overlay-active');

    }

    const navigate = useNavigate();

    const checkCart = () => {


      navigate('/cart');
    }

    return (

      <div className={styles.Overlay}>
        <div className={styles.AddedToCartContainer}>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <BsCartCheckFill size={'7rem'} style={{ margin: '1rem 2rem' }} />
            <h2>Item added to cart</h2>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={continueShopping}>Continue shopping</button>
            <button onClick={checkCart}>Check cart</button>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Left}>
          <div className={styles.ImgContainer}>
            <img src={product.wideImg} />
          </div>

          <div className={styles.InfoContainer}>
            <div className={styles.Info_Platform}>
              
              <h3>Platform</h3>

              <div className={styles.PlatformsContainer}>
                
                {product.platforms && product.platforms.map((platform, index) => {
                  const isPlatformAvailable = availablePlatforms.hasOwnProperty(platform);
              
                  return (
                    <div key={index}
                      
                      className={`${styles.Platform} ${selectedPlatform === platform ? styles.Selected_Platform : ''} ${availablePlatforms[platform] ? '' : styles.Platform_Not_Available}`}

                      id={platform}
                      onClick={() => handlePlatformSelect(platform)}
                    >

                      {platform}
                    </div>
                  );
                })}



              </div>
            </div>

            <div className={styles.Info_Tags}>
              <h3>Genres</h3>

              <div className={styles.TagsContainer}>

                {product.tags && product.tags.map((tag) => {
                  return (

                    <div className={styles.Tag}>
                      {tag}
                    </div>

                  )

                })}


              </div>
            </div>

          </div>

        </div>

        <div className={styles.Right}>
          <div className={styles.Top}>
            <span className={styles.Title}>{product.title} {selectedPlatform + ' Key'}</span>
            <span className={styles.Price}>{product.price} &euro; </span>
          </div>
          <hr></hr>
          <div className={styles.Bottom}>
            <div className={styles.BottomContainer}>
              {availability ? (
                <button onClick={addToCart}>Add to cart</button>
              ) : (
                <span>Product currently unavailable</span>
              )}

            </div>
          </div>

        </div>

      </div>

      <div className={styles.MoreInfo}>

        <div>Description</div>
        <div>Image gallery</div>
        <div>Hardware requirements</div>
        <div>Additional informations</div>

      </div>

      <div className={styles.Desc}>
        <h1>Description</h1>

        <div className={styles.Desc_Content}>
          <h3>{product.title}</h3>
          <h4>Publisher: {product.publisher}</h4>
          <span>
            {product.details && product.details.description}

          </span>


        </div>

      </div>
      {/* <ImageGallery data={data.gallery} /> */}


      <div className={styles.Requirements_Container}>
        <h1>Hardware requirements(PC)</h1>

        <div className={styles.Requirements_Content}>

          <div className={styles.MinimumReq}>
            <span>Minimum</span>
            <ul style={{ listStyle: 'none' }}>

              {product.details && Object.entries(product.details.requirements.minimal).map(([key, value]) => (
                <div style={{ display: 'flex', width: '100%' }}>
                  <h4>{key}: </h4><li>{value}</li>
                </div>
              ))}

            </ul>
          </div>

          <div className={styles.RecommendedReq}>
            <span>Recommended</span>

            <ul style={{ listStyle: 'none' }}>

              {product.details && Object.entries(product.details.requirements.recommended).map(([key, value]) => (
                <div style={{ display: 'flex', width: '100%' }}>
                  <h4>{key}: </h4><li>{value}</li>
                </div>
              ))}

            </ul>
          </div>

        </div>
      </div>


      <div className={styles.AdditionalInfo}>
        <h1>Additional informations</h1>

        <div className={styles.AdditionalInfo_Wrapper}>
          <div>
            <h3>Languages</h3>
            <ul>

              {product.details && product.details.languages.map((language) => {
                return (

                  <li>{language}</li>

                )

              })}


            </ul>
          </div>


          <div>
            <h3>Release date</h3><span>{releaseDate}</span>
            <h3>Developer</h3><span>{product.publisher}</span>
          </div>


        </div>
      </div>


      {showCartInfo &&

        <AddedToCart />

      }

    </div>
  )
}

export default ProductDetails