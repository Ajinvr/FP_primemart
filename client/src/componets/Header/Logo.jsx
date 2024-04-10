import React from 'react'
import logo from "../../assets/logo/PrimeMart crop.png";
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

  return (
    <div className='hs1'>
        <img onClick={()=>{navigate('/')}} src={logo} alt="primart logo" />     
   </div>
  )
}

export default Logo