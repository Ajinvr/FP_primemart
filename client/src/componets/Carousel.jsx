// eslint-disable-next-line eqeqeq
import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


function Carousele() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <Carousel style={{"marginBottom":"50px"}}  activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
    <img style={{width:"100%" ,height:"310PX"}} src='https://res.cloudinary.com/dibkjqtbx/image/upload/v1714544805/staticimages/xiwiikfezncprsrjwpk2.png' alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"310PX"}}  src='https://res.cloudinary.com/dibkjqtbx/image/upload/v1714544805/staticimages/q50p5mwr8eax4safupqj.png' alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"310PX"}}  src='https://res.cloudinary.com/dibkjqtbx/image/upload/v1714544806/staticimages/d3rzdjbdhwr3bjdovp38.png' alt="" />
    </Carousel.Item>
  </Carousel>
  )
}

export default Carousele