import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productdetails.css"
import { useSelector } from 'react-redux';
import { animated } from '@react-spring/web'
import {useSpring} from '@react-spring/web'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ProductDetail() {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const storeProduct = useSelector(state => state.product.value)
  const token = useSelector(state => state.auth.value.token)
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)

  const springs = useSpring({
    from: { x: -300},
    to: { x: 300},
    loop:true,
  })

 

  useEffect(() => {
  
    let fp = storeProduct.find(product => product._id === id)
    setProduct(fp)
  }, [storeProduct, id]);



  
  // const shareCurrentPage = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: document.title,
  //       url: window.location.href
  //     })
  //     .then(() => console.log('Shared successfully'))
  //     .catch((error) => console.error('Error sharing:', error));
  //   } else {
  //     // Fallback for browsers that don't support Web Share API
  //     const shareUrl = window.location.href;
  //     if (navigator.clipboard) {
  //       navigator.clipboard.writeText(shareUrl)
  //         .then(() => alert('URL copied to clipboard'))
  //         .catch((error) => console.error('Error copying to clipboard:', error));
  //     } else {
  //       // Fallback for browsers that don't support clipboard API
  //       alert('Cannot share. Please copy the URL manually.');
  //     }
  //   }
  // }
  
  const notify = (message,status) => {
    toast[status](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };



  const addToCart = async (e) => {

    if(isAuthenticated == false){
          notify("user not logged in","error")
         return
    }else{   
      try {
        let productId = e.target.parentNode.id;
           const response = await axios.post('http://localhost:5000/cart', {
               productId: productId
               }, {
                   headers: {Authorization: `Bearer ${token}`}
           });
              notify(response.data.message,response.data.toaststatus)
              console.log(response.data);
   } catch (error) {
            console.error('Error updating data:', error);
   }
    }
}

  return (
    <div>
      {product ? (
        <div className='pdm' key={product.id}>
         <div className='idv'>
          <img src={product.filename} alt="" />
         </div>
         <div className='ddv'>
         <h3>{product.title}</h3>
         <hr />
          <h5>Price: ${product.price}</h5>
          <hr />
          <p>{product.description}</p> 
          <div id={product._id} className='btns'>
              <button onClick={addToCart}>Add to cart</button>
              <button>Buy now</button>
          </div>
         </div>
        </div>
      ) : (
       <div className='loader'>
        <h2>Loading</h2>
                 <animated.div style={{width: 80,height: 80,background:'#FFAE42',borderRadius: 150,...springs}}/>
       </div>
      )}
       <ToastContainer />
    </div>
  );
}

export default ProductDetail;
