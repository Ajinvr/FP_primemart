const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
    userid:{
        type:String,
        required:[true,"please add the  userid"]
    },
    productid:{
        type:String,
        required:[true,"please add the  productid"]
    },
    sellerid:{
        type:String,
        required:[true,"please add the  address"]
    },
    address:{
        type:String,
        required:[true,"please add the  address"]
    },
    pin:{
        type:Number,
        required:[true,"please add the  pin"]
    },
    quantity:{
        type:Number,
        required:[true,"please add the  quantity"]
    },
    paymentmethod:{
        type:String,
        required:true
    }
    },
      {
         timestamps:true
      } 
    )


    module.exports= mongoose.model("orderschema",orderschema)