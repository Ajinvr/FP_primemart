const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
    userid:{
        type:Number||String,
        required:[true,"please add the  userid"]
    },
    productid:{
        type:Number||String,
        required:[true,"please add the  productid"]
    },
    address:{
        type:Number||String,
        required:[true,"please add the  address"]
    },
    pin:{
        type:Number||String,
        required:[true,"please add the  pin"]
    },
    quantity:{
        type:Number||String,
        required:[true,"please add the  quantity"]
    },
    paymentmethod:{
        type:Number||String,
        required:true
    }
    },
      {
         timestamps:true
      } 
    )


    module.exports= mongoose.model("orderschema",orderschema)