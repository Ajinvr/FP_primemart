// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../styles/home.css";
import Loader from './Loader';

function Home() {
  const navigate = useNavigate();
  const storeProduct = useSelector(state => state.product.value)

  const [products, setproduct] = useState([]);

  useEffect(() => {
   
    let fp = storeProduct
    setproduct(fp)
  }, [storeProduct]);
  
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
