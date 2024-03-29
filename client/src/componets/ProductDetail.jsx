import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productdetails.css"
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import { setpath } from '../redux/features/redirectSlice';
import { storeorderitem } from '../redux/features/orderitem';

function ProductDetail() {
  const dispatch = useDispatch();

  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const storeProduct = useSelector(state => state.product.value)
  const token = useSelector(state => state.auth.value.token)
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)

 
 

  useEffect(() => {
  
    let fp = storeProduct.find(product => product._id === id)
    setProduct(fp)
  }, [storeProduct, id]);

  
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


function order() {
  dispatch(storeorderitem([product]))
    dispatch(setpath('/order'))
  navigate('/order')
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
              <button onClick={order} >Buy now</button>
          </div>
         </div>
        </div>
      ) : (
       <div className='loaderdiv'>
         <div>
         <Loader/>  
         </div>
       </div>
      )}
       <ToastContainer />
    </div>
  );
}

export default ProductDetail;
