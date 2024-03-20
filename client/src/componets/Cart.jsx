import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/PrimeMart.png';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();

  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.37:5000/allproducts");
        // Update the state with fetched data
        setCartItems(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total price
  const totalPrice = 20 || cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container cd">
      {cartItems == undefined || cartItems == null || cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>Start Shopping Now</button>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      ) : (
        <div className='cida'>
          <h1>Cart items</h1>
          <div>
            {cartItems.map((item, index) => (
              <div className='cid' key={index}>
                  <img src={item.filename} alt="sample img" />
                      <div>
                          <h4>{item.title}</h4>
                           <p>{item.description}</p>
                          <input type="number" value={item.quantity} />
                       </div>
                <button><i className="fa-solid fa-trash fa-2xl dbtn" style={{ color: "red" }}></i></button>
              </div>
            ))}
          </div>
          <div className='cartitem'></div>
        </div>
      )}
    </div>
  );
};

export default Cart;
