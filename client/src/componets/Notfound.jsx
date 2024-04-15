
import React, { useEffect } from 'react'

function Notfound() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ textAlign: 'center', height:'100vh',alignItems:'center',display:'flex',justifyContent:'center' }}>
       <div>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for does not exist</p>
       </div>
  </div>
  )
}

export default Notfound