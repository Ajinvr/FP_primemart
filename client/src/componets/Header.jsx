import React, { useEffect, useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo/PrimeMart crop.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setpath } from '../redux/features/redirectSlice';
import Theme from './Theme';


function Header() {
  const dispatch = useDispatch();
      const navigate = useNavigate();
           const [searchbar, setSearchbar] = useState(true);
               const [dropdownstate,setdropdownstate] = useState(false)
                    const [isSeller,setisSeller] = useState(false)
                         const [isadmin,setisadmin] = useState(false)
                              
  const toggledropdown = () => {
    setdropdownstate(prevState => !prevState);
  };

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      console.log("Screen width on resize: " + screenWidth+'px');
      if (screenWidth >= 680) {
        setSearchbar(false);
      } else {
        setSearchbar(true);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);


  return (
    <div className='hm'>
      {searchbar ? (
        <>
          <div className='hs12'>
              <input className='hs12' type="text"/> 
              <button><span className="material-symbols-outlined">search</span></button>  
          </div>
          <div className='hs2'>
              <Theme/>
              <span style={{cursor:'pointer'}} onClick={()=>{navigate('/cart');dispatch(setpath('/cart'))}} className="material-symbols-outlined">shopping_cart</span>
              <span style={{cursor:'pointer'}} onClick={toggledropdown} className="material-symbols-outlined">person</span> 
              { dropdownstate ? (
                  <div className='pd'>
                      <div><a className='dm' onClick={()=>{navigate('/profile');dispatch(setpath('/profile'))}}>Profile</a></div>
                      <div><a className='dm' href="#">Orders</a></div>
                      <div><a className='dm' href="#">Logout</a></div>
                   { isSeller || isadmin ? ( 
                        <div><a className='dm' href="#">Go to dashboard</a></div>
                   ):(
                        <div><a className='dm' href="#">Become a seller</a></div>)
                   }
                  </div>
            ) : (
                  <></>
            ) }

          </div>
      </>
      ) : (
        <>
          <div className='hs1'>
              <img onClick={()=>{navigate('/')}} src={logo} alt="primart logo" />     
          </div>
          <div className='hs2'>
              <div className='sbd'>
                  <input type="text"/>
                        <button><span className="material-symbols-outlined">search</span></button>
              </div>
           
            <Theme/>
            <span style={{cursor:'pointer'}} onClick={()=>{navigate('/cart');dispatch(setpath('/cart'))}} className="material-symbols-outlined">shopping_cart</span>
            <span style={{cursor:'pointer'}} onClick={toggledropdown} className="material-symbols-outlined">person</span> 
           
            { dropdownstate ? (
                  <div className='pd'>
                      <div><a className='dm' onClick={()=>{navigate('/profile');dispatch(setpath('/profile'))}}>Profile</a></div>
                      <div><a className='dm' href="#">Orders</a></div>
                      <div><a className='dm' href="#">Logout</a></div>
                   { isSeller || isadmin ? ( 
                        <div><a className='dm' href="#">Go to dashboard</a></div>
                   ):(
                        <div><a className='dm' href="#">Become a seller</a></div>)
                   }
                  </div>
            ) : (
                  <></>
            ) }

           
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
