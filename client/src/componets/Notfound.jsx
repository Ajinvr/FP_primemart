import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Notfound() {
   const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div style={{textAlign:'center',height:'100vh',alignItems:'center',display:'flex',justifyContent:'center' }}>
       <div>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for does not exist</p>
            <button onClick={()=>navigate('/')} className='back-to-home-btn'>Return to home</button>
       </div>
  </div>
  )
}

export default Notfound