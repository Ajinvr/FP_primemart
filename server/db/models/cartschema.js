const mongoose = require("mongoose");

const cart = mongoose.Schema({
    email:{
        type:String,
        required:[true,"please add the email id"]
    },
    productid:{
        type:String,
        required:[true,"please add the productid"]
    },
    quantity:{
        type:String,
        default:1
    }
})

module.exports= mongoose.model("cart",cart)