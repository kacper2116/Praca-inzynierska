import React, { useEffect, useRef, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from '../styles/navbar.module.css'
import { Badge } from "@material-ui/core";
import { IoMdCart } from "react-icons/io";
import { useSelector } from 'react-redux'
import { FaUser, FaSignOutAlt, FaLock } from 'react-icons/fa';
import { userRequest } from '../requestMethods'
import Logo from '../img/Logo.png';
import Loading from './Loading'
import { TbBrandShopee } from "react-icons/tb";

import { useSearchParams, setSearchParams } from "react-router-dom";

import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { logout } from '../redux/userActions'
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";

import axios from 'axios';



const Navbar = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

 


  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const displayUserPanel = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target)

    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  //Wyszukiwarka


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false)

  const maxResults = 5;
  const displayedResults = searchResults.slice(0, maxResults);

  const resultsContainerRef = useRef(null);


  //Monitorowanie kliknięcia poza wyszukiwarką w celu schowania wyników

  const handleClickOutside = (event) => {

    if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
      setSearchResultsVisible(false);

    }
  };

  useEffect(() => {

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /////////////////////////////////////////////////////////////////////

  const navigate = useNavigate()


  useEffect(() => {


    const handleSearch = async () => {

      try {

        if (searchTerm != '' && searchTerm != undefined) {
          const response = await userRequest.get(`/products/search?query=${searchTerm}`);
          setSearchResults(response.data);
          setNoResults(false)

        } else {

          setSearchResults([]);
        }

      } catch (error) {

        setNoResults(true)

      } finally {
        setLoading(false)

      }


    };

    handleSearch()


  }, [searchTerm])


  const handleResultClick = (productId) => {

    navigate(`/product?id=${productId}`)

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      seeMore();
    }
  };

  const seeMore = () => {


    searchParams.set("text", { searchTerm })

    navigate({
      pathname: '/products',
      search: `?text=${searchTerm}`
    });


    setSearchResultsVisible(false)

  }

  return (


    <div className={styles.Container}>


      <div className={styles.Left}>

        <Link to={'/'}>
          <img className={styles.Logo} src={Logo} />
        </Link>


        <div className={styles.SearchContainer} ref={resultsContainerRef}>


          <div className={styles.SearchBar}>
            <AiOutlineSearch style={{ fontSize: "2rem" }} />
            <input className={styles.SearchInput} placeholder='Search' value={searchTerm === undefined ? '' : searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSearchResultsVisible(true)} onKeyPress={handleKeyPress} />
            <MdClear className={styles.ClearButton} style={{ fontSize: "2rem" }} onClick={() => { setSearchTerm(undefined) }} />
          </div>


          {searchResultsVisible && (searchTerm != '' && searchTerm != undefined) && (

            <div>


              <div>
                {loading ? (
                  <Loading size={'2'} />
                ) : (
                  <div className={styles.SearchResults}>
                    {noResults ? (
                      <div className={styles.NoResults}>No results</div>
                    ) : (
                      <>
                        {displayedResults.map((result) => (
                          <div key={result._id} onClick={() => handleResultClick(result._id)}>
                            <img src={result.img} alt={result.title} />
                            <h3>{result.title}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: '1rem', fontWeight: '700' }}>{result.price}</span>
                              <span style={{ fontSize: '1rem', fontWeight: '700', textAlign: 'center' }}>$</span>
                            </div>
                          </div>
                        ))}
                        {searchResults.length > maxResults && (
                          <div className={styles.SearchResultsSummary}>
                            <span>{searchResults.length} Results</span>
                            <button className={styles.SeeMoreButton} onClick={() => seeMore()} >See More</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>





            </div>

          )}

        </div>

        {/* { isInputFocused && (
          <div className={styles.Overlay}>

          </div>

          )}  */}





        <div className={styles.LangContainer}>
          <div style={{ display: "flex", cursor: "pointer" }}>
            <div className={styles.Flag}></div>
            <span className={styles.Lang}>PL</span>
          </div>
        </div>

      </div>



      <div className={styles.Right}>

        {!user &&
          <Link to={'/login'}>
            <span className={styles.Login}>Login</span>
          </Link>
        }

        {!user &&
          <Link to={'/register'}>
            <span className={styles.Register}>Register</span>
          </Link>
        }

        {user &&

          <div className={styles.UserPanel} ref={panelRef} onClick={displayUserPanel}>

            <div>
              <FaUser /> <span>{jwtDecode(user).username}</span>

            </div>

            {isOpen && (

              <div className={styles.User_dropdown_menu}>

                <div>
                  <FaSignOutAlt /> <span onClick={() => dispatch(logout())}>Logout</span>
                </div>

                <div>
                  <FaLock /> <span>Change Password</span>
                </div>

                <div>
                  <TbBrandShopee /><span onClick={() => navigate('/orders')}>My orders</span>
                </div>

              </div>
            )

            }
          </div>

        }




        <Link to='/cart'>
          <Badge badgeContent={quantity} color="primary" className={styles.Cart_Badge}>
            <IoMdCart color="action" size='2rem' />
          </Badge>
        </Link>

      </div>



    </div>
  )
}

export default Navbar