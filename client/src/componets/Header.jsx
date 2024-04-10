// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react';
import "../styles/header.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setpath } from '../redux/features/redirectSlice';
import Theme from './Theme';
import Profile from './dropdownmenuheader/Profile';
import Orders from './dropdownmenuheader/Orders';
import Userlogin from './dropdownmenuheader/Userlogin';
import Dashboard from './dropdownmenuheader/Dashboard';
import Search from './Header/Search';
import Logo from './Header/Logo';

function Header() {
  const dispatch = useDispatch();
      const navigate = useNavigate();
           const [searchbar, setSearchbar] = useState(true);
               const [dropdownstate,setdropdownstate] = useState(false)
  
               
  const toggledropdown = () => {
    setdropdownstate(prevState => !prevState);
  };


  useEffect(() => {
     const timeoutId = setTimeout(() => {
          setdropdownstate(false);
     },3000); 
      return () => clearTimeout(timeoutId);
  }, [dropdownstate]);


  useEffect(() => {
          function handleResize() {
                  const screenWidth = window.innerWidth;
                       if (screenWidth >= 680) {
                           setSearchbar(false);
                       } else {
                           setSearchbar(true);
                       }
          }
          handleResize();
          window.addEventListener('resize', handleResize);
  },[]);


  return (
    <div className='hm'>
        {searchbar ? (
               <>
                 <Search/>
                    <div className='hs2'>
                        <Theme/>
                            <span style={{cursor:'pointer'}} onClick={()=>{navigate('/cart');dispatch(setpath('/cart'))}} className="material-symbols-outlined theme">shopping_cart</span>
                                <span style={{cursor:'pointer'}} onClick={toggledropdown} className="material-symbols-outlined theme">person</span> 
                 {dropdownstate ? (
                     <div className='pd'>
                          <Profile/>
                          <Orders/>
                          <Userlogin/>
                          <hr />
                          <Dashboard/>
                    </div>
                ) : (
                  <></>
                ) }
          </div>
      </>
      ) : (
           <>
            <Logo/>
               <div className='hs2'>
                   <Search/>
                      <Theme/>
                           <span style={{cursor:'pointer'}} onClick={()=>{navigate('/cart');dispatch(setpath('/cart'))}} className="material-symbols-outlined theme">shopping_cart</span>
                                <span style={{cursor:'pointer'}} onClick={()=>{toggledropdown()}} className="material-symbols-outlined theme">person</span> 
                     { dropdownstate ? (
                          <div className='pd'>
                              <Profile/>
                              <Orders/>
                              <Userlogin/>
                              <hr />
                             <Dashboard/>
                          </div>
                     ):(
                       <></>
                     )}   
               </div>
           </>
         )}
    </div>
  );
}


export default Header;
