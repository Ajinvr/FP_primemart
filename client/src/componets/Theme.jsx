// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { themeset } from '../redux/features/themeSlice';



function Theme() {

  const dispatch = useDispatch();

  const [theme, settheme] = useState(false)

  const toggletheme = () => {
    settheme(prevState => !prevState);
    dispatch(themeset(theme))
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme ? '#11254a' : '#faf5e8';
    document.body.style.color = theme ? 'white' : 'black';
  }, [theme]);



  return (
    <div style={{cursor:'pointer',display:'flex'}} >
     {theme ? (  <span style={{cursor:'pointer'}} onClick={toggletheme} className="material-symbols-outlined theme">dark_mode</span>
     ):(
     <span style={{cursor:'pointer'}} onClick={toggletheme} className="material-symbols-outlined theme">light_mode</span>
     )}
    </div>
  )
}

export default Theme