// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../styles/profile.css"





function Profile() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user =  useSelector(state => state.auth.value) 
       const [orders, setorders] = useState(null);

  return (
    <div className='pm'>
      <div className='pp'><img src="https://source.unsplash.com/random/?superbike" alt="" /></div>
     <div className='ps1'><h1>{`${user.usn}`}</h1></div>
    <div className='ps2'><h5>{user.email}</h5></div>
  <hr />
    <div className='ps3'><h1>orders</h1></div>
    { orders ? (
           <div>nor</div>
    ) : (
      <div className="no-orders">
          <h1>Your Order History is Empty</h1>
               <h6>You haven't placed any orders yet!</h6>
      </div>
    )
}
    </div>
  )
}

export default Profile