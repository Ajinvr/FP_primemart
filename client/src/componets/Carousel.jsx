// eslint-disable-next-line eqeqeq
import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import C1 from "../assets/cr/CI1.png"
import C2 from "../assets/cr/CI2.png"
import C3 from "../assets/cr/CI3.png"

function Carousele() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <Carousel style={{"marginBottom":"50px"}}  activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
    <img style={{width:"100%" ,height:"310PX"}} src={C1} alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"310PX"}}  src={C2} alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"310PX"}}  src={C3} alt="" />
    </Carousel.Item>
  </Carousel>
  )
}

export default Carousele