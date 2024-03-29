import React, { useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo/PrimeMart crop.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setpath } from '../redux/features/redirectSlice';
import Theme from './Theme';


function Header() {

  const dispatch = useDispatch();
      const navigate = useNavigate();
           const [searchbar, setSearchbar] = useState(false);
               const [dropdownstate,setdropdownstate] = useState(false)
                    const [isSeller,setisSeller] = useState(true)
                         const [isadmin,setisadmin] = useState(false)
                       
                         const [isauthenticated,setisauthenticated] = useState(false)
  
  const toggleSearchbar = () => {
    setSearchbar(prevState => !prevState);
  };

  const toggledropdown = () => {
    setdropdownstate(prevState => !prevState);
  };

  return (
    <div className='hm'>
      {searchbar ? (
        <>
         <div className='hs1'>
              <input className='si' type="text"/>   
          </div>
        <div className='hs2'>
          <div style={{display:"block",justifyContent:"spaceBetween"}} className='sbd'>
           
            <button><span className="material-symbols-outlined">search</span></button>
          </div>
          <span onClick={toggleSearchbar} className="material-symbols-outlined siss">search</span>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="material-symbols-outlined">person</span> 
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
            <span onClick={toggleSearchbar} className="material-symbols-outlined siss">search</span>
           
            <Theme/>
         
            <span onClick={()=>{navigate('/cart');dispatch(setpath('/cart'))}} className="material-symbols-outlined">shopping_cart</span>
            <span onClick={toggledropdown} className="material-symbols-outlined">person</span> 
           
            { dropdownstate ? (
                  <div className='pd'>
                    <div><a className='dm' onClick={()=>{navigate('/profile');dispatch(setpath('/profile'))}}>Profile</a></div>
                    <div><a className='dm' href="#">Orders</a></div>
                    <div><a className='dm' href="#">Logout</a></div>
                   { isSeller || isadmin ? ( <div><a className='dm' href="#">Go to dashboard</a></div>):( <div><a className='dm' href="#">Become a seller</a></div>)

                   }
                  </div>
            ) : (
                  <></>
            ) }

           
           
            {/* <span onClick={()=>{navigate('/profile');dispatch(setpath('/profile'))}} className="material-symbols-outlined">person</span>  */}
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
