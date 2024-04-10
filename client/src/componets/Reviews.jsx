// eslint-disable-next-line eqeqeq
import React from 'react'
import '../styles/reviews.css'
import Headline from './Headline'
function Reviews() {
  return (
    <div>
      <hr />
      <Headline value={'Reviews'}/>
          <div className='review-div-main' >

            
             <div className='reviews-card'>
               <h5>Buyername</h5>
                <hr />
               <p>“My stay at HotelName was nothing short of spectacular. The hotel’s elegant design, combined with its top-notch amenities, made for a truly relaxing and enjoyable experience. The attentive and courteous staff catered to my every need, ensuring that my stay was as comfortable as possible. With its convenient location and outstanding service, [HotelName] has quickly become my go-to choice for accommodations whenever I travel to the area. 5 star!”</p>
             </div>
          </div>
    </div>  
  )
}

export default Reviews