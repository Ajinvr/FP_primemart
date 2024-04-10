// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "../styles/home.css";
import Loader from './Loader';
import Headline from './Headline';
import axiosInstance from '../axiosInstance'

function Home() {
  const navigate = useNavigate();
  const storeProduct = useSelector(state => state.product.value)
  const user = useSelector(state => state.auth.value);

  const [products, setproduct] = useState([]);

  useEffect(() => {
   
    let fp = storeProduct
    setproduct(fp)
  }, [storeProduct]);


  const addToCart = async (e) => {

    if(user.isAuthenticated == false){
          notify("user not logged in","error")
         return
    }else{  
      let token = user.token 
      try {
        let productId = e.target.id;
           const response = await axiosInstance.post('cart', {
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


const notify = (message, status) => {
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
    <div className='pmd'>
      {products ? (
        products.map((element, index) => (
          <div onClick={() => navigate(`/product/${element._id}`)} className='pc' key={index}>
            <img id={element._id} src={element.filename} alt="Product" />
            <div className='pdiv'><p className='pt'>{element.title}</p></div>
            <hr/>
            <h5>Price : {element.price}/-</h5>
          </div>
        ))
      ) : (
        <div className='loaderdiv'>
          <div>
             <Loader/>  
          </div>
       </div>
      )}
    </div>
  );
}

export default Home;
