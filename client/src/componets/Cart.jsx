import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { storeorderitem } from '../redux/features/orderitem';
import { setpath } from '../redux/features/redirectSlice';

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.value);
  const products = useSelector(state => state.product.value);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rs, setrs] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://192.168.1.37:5000/cart", {
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
      const res = await axios.put(
        "http://192.168.1.37:5000/cart",
        {
          productid: productId,
          action: "put"
        },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      const updatedCartItems = cartItems.map(item => {
        if (item._id === productId) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity < 1) {
            rmfc(e); // If quantity becomes less than 1, remove the item from cart
          }
          return { ...item, quantity: updatedQuantity };
        } else {
          return item;
        }
      });

      setCartItems(updatedCartItems);
      setrs(res.data);
    } catch (error) {
      notify("Error removing item from cart", "error");
    }
  }

  async function rmfc(e) {
    let productId = e.target.id;
    try {
      const res = await axios.put("http://192.168.1.37:5000/cart",
        {
          productid: productId,
          action: "delete"
        },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setrs(res.data);
    } catch (error) {
      notify("Error removing item from cart", "error");
    }
  }

  const icq = async (e) => {
    let productId = e.target.id;
    try {
      const res = await axios.post('http://localhost:5000/cart', {
        productId: productId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setrs(res.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


 async function order() {
    dispatch(storeorderitem(cartItems))
      dispatch(setpath('/order'))
      const amount = totalAmount
     try {
      let res = await axios.post("http://localhost:5000/payment",{amount})
      console.log(res.data);
      openrazorpay(res.data)
     } catch (error) {
      notify('error creating order','error')
     }
  }
 
  
  
async function openrazorpay(data) {
  const options = {
    "key":"rzp_test_TZtYXwjdF9MvFF",
    "amount" : data.amount,
    "name": "primemart"
  }
  var rzp = new window.Razorpay(options);
  rzp.open()

  console.log(rzp);
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
    <div className="cart-container cd">
      {cartItems == null || cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Shopping Cart is Empty</h1>
          <button className="btn-shop-now" onClick={() => navigate('/')}>Start Shopping Now</button>
        </div>
      ) : (
        <div className='cida'>
          <h1>Cart items</h1>
          <div className='cartdiv'>
            {cartItems.map((item, index) => (
              <div className='cid' key={index}>
                <div>
                  <img onClick={() => { navigate(`/product/${item._id}`) }} src={item.filename} alt="sample img" />
                </div>
                <div className='dd'>
                  <h6>{item.title}</h6>
                  <p>{item.description}</p>
                  <div className='bg'>
                    <div className='cpr'>
                      <span id={item._id}>${item.price}</span>
                    </div>
                    <div className='cpq'>
                      <button onClick={dcpq} id={item._id}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={icq} id={item._id}>+</button>
                    </div>
                    <div className='cpr'>
                      <button onClick={rmfc} id={item._id}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='cartitem'>
            <hr />
            <h3>Total : {totalAmount}</h3>
            <div className='cpb' onClick={order}>
              <h3 onClick={order}>buynow</h3>
            </div>
            <hr />
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Cart;
