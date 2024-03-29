import React, { useState, useEffect } from 'react';
// import { useRazorpay } from 'Rax';


const Payment = ({ amount, orderId, onPaymentSuccess }) => {
  // const [razorpayOptions, setRazorpayOptions] = useState(null);
  // const razorpay = 'dd'

  // useEffect(() => {
  //   const fetchRazorpayOptions = async () => {
  //     try {
  //       const response = await fetch('/api/orders', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ amount }),
  //       });
  //       const data = await response.json();
  //       setRazorpayOptions(data.order);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle errors appropriately
  //     }
  //   };

  //   fetchRazorpayOptions();
  // }, [amount]); // Re-fetch options if amount changes

  // const handlePayment = async () => {
  //   const options = {
  //     ...razorpayOptions,
  //     // Add any additional options as needed
  //   };

  //   const response = await razorpay.open(options);

  //   if (response.status === 'authorized') {
  //     // Payment successful, send verification details to backend
  //     const { razorpay_payment_id, razorpay_signature } = response;
  //     const verificationData = {
  //       razorpay_order_id: orderId, // Pass the order ID
  //       razorpay_payment_id,
  //       razorpay_signature,
  //     };

  //     try {
  //       const verificationResponse = await fetch('/api/verify', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(verificationData),
  //       });
  //       const verificationData = await verificationResponse.json();

  //       if (verificationData.message === 'Payment successful') {
  //         onPaymentSuccess(); // Call a function to handle success
  //         // Update UI or order status
  //       } else {
  //         console.error('Verification failed');
  //         // Handle verification failure
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       // Handle errors appropriately
  //     }
  //   } else {
  //     console.error('Payment cancelled or failed');
  //     // Handle payment cancellation or failure
  //   }
  // };

  // return (
  //   <div>
  //     {/* Display order details and amount */}
  //     <button onClick={handlePayment}>Pay Now</button>
  //   </div>
  // );
};

export default Payment;
