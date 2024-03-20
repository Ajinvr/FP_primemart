const configDotenv  = require("dotenv").config()

const express = require("express")
const app = express()
const cors = require('cors')
const Razorpay = require("razorpay")

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/photos",express.static('uploads'))

// db connection
const connectdb = require("./db/config/dbconnection");
connectdb()

// routes
const userRotes = require("./routes/userroutes");
app.use(userRotes)
const productroutes = require("./routes/productroutes");
app.use(productroutes)
const orderroutes = require("./routes/orderRoute");
app.use(orderroutes);




let port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})