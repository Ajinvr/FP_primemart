const mongoose = require('mongoose');

// Define user role update request schema
const userRoleUpdateRequestSchema = new mongoose.Schema({
 userid:{
    type:String,
    required:[true,"please add the user id"]
 },
 useremail:{
    type:String,
    required:[true,"please add the email id"]
 }
});



module.exports =  mongoose.model("userRoleUpdateRequestSchema",userRoleUpdateRequestSchema)
