const express = require("express");
const router = express.Router();
const  orderproductcontroller  = require("../controllers/productcontrollers/orderController");


router.route("/payment").post(orderproductcontroller.payment)


module.exports = router;