// eslint-disable-next-line eqeqeq
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productdetails.css"
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import { setpath } from '../redux/features/redirectSlice';
import { storeorderitem } from '../redux/features/orderitem';
import Reviews from './Reviews';



function ProductDetail() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.value);
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

  
 


  const addToCart = async (e) => {

    if(isAuthenticated == false){
          notify("user not logged in","error")
         return
    }else{   
      try {
        let productId = e.target.parentNode.id;
           const response = await axios.post('http://192.168.1.37:5000/cart', {
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
  let orderproduct = {...product}
     orderproduct.quantity = 1
  dispatch(storeorderitem([orderproduct]))
  console.log(product);
    dispatch(setpath('/order'))
  navigate('/order')
}


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
          <h5>Price: {product.price}/-</h5>
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
       <Reviews/>
       <ToastContainer />
    </div>
  );
}

export default ProductDetail;
