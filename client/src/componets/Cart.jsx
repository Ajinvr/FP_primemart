// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { storeorderitem } from '../redux/features/orderitem';
import { setpath } from '../redux/features/redirectSlice';
import axiosInstance from '../axiosInstance';
import Headline from './Headline';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.value);
  const products = useSelector(state => state.product.value);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rs, setRs] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const cartItemIds = res.data;
        const cartItemsData = [];
        cartItemIds.forEach(itemId => {
          const matchedProduct = products.find(product => product._id === itemId.productid);
          if (matchedProduct) {
            const updatedProduct = { ...matchedProduct, quantity: itemId.quantity };
            cartItemsData.push(updatedProduct);
          }
        });
        setCartItems(cartItemsData);
        const totalValue = cartItemsData.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
        setTotalAmount(totalValue);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCart();
  }, [user.token, products, rs]);

  async function dcpq(e) {
    let productId = e.target.id;
    try {
      const res = await axiosInstance.put("cart", {
        productid: productId,
        action: "put"
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const updatedCartItems = cartItems.map(item => {
        if (item._id === productId) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity < 1) {
            rmfc(e);
          }
          return { ...item, quantity: updatedQuantity };
        } else {
          return item;
        }
      });

      setCartItems(updatedCartItems);
      setRs(res.data);
    } catch (error) {
      notify("Error removing item from cart", "error");
    }
  }

  async function rmfc(e) {
    let productId = e.target.id;
    try {
      const res = await axiosInstance.put("cart", {
        productid: productId,
        action: "delete"
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRs(res.data);
    } catch (error) {
      notify("Error removing item from cart", "error");
    }
  }

  const icq = async (e) => {
    let productId = e.target.id;
    try {
      const res = await axiosInstance.post('/cart', {
        productId: productId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRs(res.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  async function order() {
    dispatch(storeorderitem(cartItems));
    dispatch(setpath('/order'));
    navigate('/order')
  }

 

  const notify = (message, status) => {
    toast[status](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="cart-container">
      {cartItems == null || cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>Start Shopping Now</button>
        </div>
      ) : (
        <div className='cart-container'>
          <Headline value={'Cart Items'}/>
          <div className='cartdiv'>
            {cartItems.map((item, index) => (
              <div className='cart-item-div btheme' key={index}>
                <div>
                  <img onClick={() => { navigate(`/product/${item._id}`) }} src={item.filename} alt="sample img" />
                </div>
                <div className='cart-text'>
                  <h6>{item.title}</h6>
                  <p>{item.description}</p>
                  <div className='pqr-div'>
                    <div className='cpr'>
                      <span id={item._id}><h6>Price : {item.price}/-</h6></span>
                    </div>
                    <div className='cart-product-quantity  btheme'>
                      <button className='cqbtheme' onClick={dcpq} id={item._id}>-</button>
                      <span>{item.quantity}</span>
                      <button className='cqbtheme' onClick={icq} id={item._id}>+</button>
                    </div>
                    <div className='remove-btn'>
                      <button onClick={rmfc} id={item._id}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='cartitem'>
            <hr />
            <h3>Total : {totalAmount} /-</h3>
            <div className='order-btn' onClick={order}>
              <h3>buynow</h3>
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
