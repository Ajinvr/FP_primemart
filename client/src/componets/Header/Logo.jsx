import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

  return (
    <div className='hs1'>
        <img onClick={()=>{navigate('/')}} src='https://res.cloudinary.com/dibkjqtbx/image/upload/v1714544580/staticimages/if7qh4fr6iufexaedgjt.png' alt="primart logo" />     
   </div>
  )
}

export default Logo