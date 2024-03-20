import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import C1 from "../assets/cr/MOC.png"
import C2 from "../assets/cr/XOC.png"
import C3 from "../assets/cr/smc.png"

function Carousele() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <Carousel style={{"marginBottom":"50px"}}  activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
    <img style={{width:"100%" ,height:"300PX"}} src={C1} alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"300PX"}}  src={C2} alt="" />
    </Carousel.Item>
    <Carousel.Item>
    <img style={{width:"100%",height:"300PX"}}  src={C3} alt="" />
    </Carousel.Item>
  </Carousel>
  )
}

export default Carousele