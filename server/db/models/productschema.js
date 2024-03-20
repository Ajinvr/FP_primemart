const mongoose = require("mongoose");

const addproductsSchema = mongoose.Schema({
    userid:{
        type:String,
        required:[true,"please add the  userid"]
    },
    title:{
        type:String,
        required:[true,"please add the  title"]
    },
    price:{
        type:Number||String,
        required:[true,"please add the  price"]
    },
    catogory:{
        type:String,
        required:[true,"please add the  catogory"]
    },
    quantity:{
        type:Number,
        required:[true,"please add the  quantity"],
        default:1
    },
    description:{
        type:String,
        required:[true,"please add a  description"]
    },
    filename:{
        type: String,
        required: [true, "Please add the filename"]
            }
        
})

module.exports= mongoose.model("addproductsSchema",addproductsSchema)