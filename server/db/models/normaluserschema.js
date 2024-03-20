const mongoose = require("mongoose");

const normaluserschema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"please add the email address"]
    },
    password:{
        type:String,
        required:[true,"please add a password"]
    },
    role:{
        type:String,
        required:[true,"please select role"],
        default: "user",
    },
},
{
    timestamps:true
}
)

module.exports= mongoose.model("form",normaluserschema)