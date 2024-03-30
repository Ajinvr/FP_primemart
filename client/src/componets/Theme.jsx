import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { themeset } from '../redux/features/themeSlice';



function Theme() {

  const dispatch = useDispatch();

  const [theme, settheme] = useState(false)

  const toggletheme = () => {
    settheme(prevState => !prevState);
    dispatch(themeset(theme))
  };

  return (
    <div style={{cursor:'pointer',display:'flex'}} >
     {theme ? (  <span style={{cursor:'pointer'}} onClick={toggletheme} className="material-symbols-outlined">dark_mode</span>
     ):(
     <span style={{cursor:'pointer'}} onClick={toggletheme} className="material-symbols-outlined">light_mode</span>
     )}
    </div>
  )
}

export default Theme