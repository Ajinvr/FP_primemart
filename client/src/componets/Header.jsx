import React, { useState } from 'react';
import "../styles/header.css";
import logo from "../assets/logo/PrimeMart crop.png";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [searchbar, setSearchbar] = useState(false);

  const toggleSearchbar = () => {
    setSearchbar(prevState => !prevState);
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
            <span onClick={()=>{navigate('/cart')}} className="material-symbols-outlined">shopping_cart</span>
            <span onClick={()=>{navigate('/profile')}} className="material-symbols-outlined">person</span> 
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
