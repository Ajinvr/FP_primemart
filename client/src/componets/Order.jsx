import React, { useEffect, useState } from 'react';
import '../styles/order.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  const navigate = useNavigate();
  

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });

  const orderproducts = useSelector(state => state.order.value)
  useEffect(() => {
     setProducts(orderproducts)
  }, []);



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const calculateTotalPrice = () => {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here
    // - Validate form data (optional)
    // - Send data to backend for order processing
    // - Clear form or display a success message

    console.log('Order submitted:', formData); // For demonstration purposes
  };

  return (
    <div className="order-page">
      <div className="order-products">
        <h2>Your Order</h2>
        <ul>
          {products.map((item,index) => (
           <div className='cid' key={index}>
           <div>
             <img src={item.filename} alt="sample img" />
           </div>
           <div className='dd'>
             <h6>{item.title}</h6>
             <p>{item.description}</p>
             <div className='bg'>
               <div className='cpr'>
                 <span id={item._id}>Price : {item.price}</span>
               </div>
               <div>
                 <span> Quantity : {item.quantity}</span>
               </div>
             </div>
           </div>
         </div>
          ))}
        </ul>
      <div></div>
      <hr />
        <div className="total-price">
          <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
        </div>
      </div>
      <div className="order-form">
        <h2>Billing & Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              name="addressLine1"
              id="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              id="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input
              type="text"
              name="zip"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
      <button onClick={navigate('/payment')}>klasifdjds</button>
    </div>
  );
};

export default Order