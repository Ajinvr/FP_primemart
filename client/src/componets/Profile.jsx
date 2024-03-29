import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import "../styles/profile.css"




function Profile() {

  const user = useSelector(state => state.auth.value)
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
               <p>You haven't placed any orders yet!</p>
      </div>
    )
}
    </div>
  )
}

export default Profile