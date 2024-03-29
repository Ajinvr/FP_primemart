const Razorpay = require("razorpay")



// order product===========================================================================================
exports.orderproductcontroller = (req,res) => {

}

exports.getorders = (req,res) =>{
    
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