const Razorpay = require("razorpay")
const crypto = require('crypto');
const order = require('../../db/models/ordersSchema')

// order product===========================================================================================
exports.getAllOrders = async (req, res) => {
  try {
      const userData = req.body.user;
      
      if (userData.usr == 'admin') {
          const allOrders = await order.find();

          if (allOrders.length > 0) {
             return res.status(200).json(allOrders);
          } else {
             return res.json({ message: 'No orders found' });
          }
      } else {
        return  res.status(401).json({ message: 'Access denied' });
      }
  } catch (error) {
      console.error("Error fetching orders:", error);
    return  res.status(500).json({ message: 'Internal server error' });
  }
}


exports.getAllOrderssearch = async (req, res) => {
  let userdata = req.body.user;
  if (userdata.usr == "admin") {
       const { serchvalue, serchtext } = req.body;
          if (!serchvalue && !serchtext) {
             return res.status(400).json({ message:"incomplete request"});
           }
            if (serchvalue == 'All') {
                const orders = await order.find();
                   if (orders.length>0) {
                      return res.json(orders);
                   }else{
                        return  res.json({message:"No orders found"});
                   }
            }
               try {
                 const orders = await order.find({ [serchvalue]: serchtext });
                     res.json(orders);
               } catch (error) {
                      console.error("Error occurred during search:", error);
                          res.status(500).json({ error: "An error occurred while processing your request." });
               }
  }else{
       res.status(401).json({message:"only admins have access to this route"})
  }
}


exports.getOrdersBySeller = async (req, res) => {
      const userData = req.body.user;
          if (userData.usr === "seller") {
               try {
                let sellerid = userData.usi
                  const sellerOrders = await order.find({sellerid});
                  if (sellerOrders.length > 0) {
                      res.status(200).json(sellerOrders);
                  } else {
                      res.status(200).json({ message: 'No orders found for this seller' });
                  }
              } catch (error) {
                  console.error("Error fetching seller's orders:", error);
                  res.status(500).json({ message: 'Internal server error' });
              }
          }
 }






// razorpay=============================================
let keyid = process.env.R_key_id
   let secretkey = process.env.R_secret_key
      const instance = new Razorpay({
            key_id:keyid,
            key_secret:secretkey
      });
// razorpay=============================================
  
exports.payment = async (req, res) => {
    console.log(req.body.amount);
    const options = {
        amount:req.body.amount * 100,
        currency: "INR"
    };

    try {
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ error: "Could not create order" });
    }
};

exports.paymentverify = async (req,res)=>{
    try {
        const { razorpay_payment_id, razorpay_signature } = req.body;
    
        const generated_signature = crypto.createHmac('sha256', process.env.R_secret_key)
          .update(`<span class="math-inline">\{razorpay\_order\_id\}\|</span>{razorpay_payment_id}`)
          .digest('hex');
    
        if (generated_signature === razorpay_signature) {
          // Payment successful (update order status in database)
          res.json({ message: 'Payment successful' });
        } else {
          res.status(400).json({ message: 'Invalid signature' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying payment' });
      }
}