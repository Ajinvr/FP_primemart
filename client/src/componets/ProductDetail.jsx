// eslint-disable-next-line eqeqeq
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productdetails.css"
import { useSelector,useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import { setpath } from '../redux/features/redirectSlice';
import { storeorderitem } from '../redux/features/orderitem';
import Reviews from './Reviews';
import axiosInstance from '../axiosInstance';
import {cartquantity} from '../redux/features/usercartSlice';
import Footer from './Footer';
import Notfound from "./Notfound"

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
    let fp = storeProduct.find(product => product._id === id);
         setProduct(fp); 
}, [storeProduct, id]);

  const addToCart = async (e) => {

    if(isAuthenticated == false){
          notify("user not logged in","error")
         return
    }else{   
      try {
        let productId = e.target.parentNode.id;
           const response = await axiosInstance.post('/cart', {
               productId: productId
               }, {
                   headers: {Authorization: `Bearer ${token}`}
           });
              notify(response.data.message,response.data.toaststatus)
             getCart()
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  const getCart = async () => {
    if (isAuthenticated == true) {
      try {
        const res = await axiosInstance.get("/cart", {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        if (res && res.data) {
            const resLength = Object.keys(res.data).length;
              dispatch(cartquantity(resLength))
        } else {
          dispatch(cartquantity(0))
        }

    } catch (error) {
        console.log(error);
    }
    }
    
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

if (product === undefined) {
  return(
    <Notfound/>
  )
}

  return (
    <div>
      {product ? (
        <>
          <div className='product-details-main'>
               
               <div className='product-image-div'> 
                    <img src={product.filename} alt="" />
               </div>

               <div className='product-details-div'>
                     <h4>{product.title}</h4>
                     <div style={{width:"100%",height:"1px",background:" #bebebe",margin:"10px 0px"}}></div>
                     <h5>Price : {product.price}/-</h5>
                     <div style={{width:"100%",height:"1px",background:" #bebebe",margin:"10px 0px"}}></div>

                         <h5 className='description-title'>Description</h5>
                         <div className='product-details'>
                         <p>{product.description}</p> 
                         </div>
              
                     <div id={product._id} className='btns'>
                         <button onClick={addToCart}>Add to cart</button>
                         <button onClick={order} >Buy now</button>
                     </div>
              
               </div>
          </div>
            <Reviews/>
          <Footer/>
        </> 
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
