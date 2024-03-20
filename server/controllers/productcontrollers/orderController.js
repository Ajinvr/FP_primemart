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
    const options = {
        amount: 20000,// amount in the smallest currency unit
        currency: "INR",
        receipt:"order_rcptid_11"
    };

    try {
        const order = await instance.orders.create(options);
        console.log(order);
        res.json("done");
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ error: "Could not create order" });
    }
};
