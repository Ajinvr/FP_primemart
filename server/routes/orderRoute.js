const express = require("express");
const router = express.Router();
const  orderproductcontroller  = require("../controllers/productcontrollers/orderController");


router.route("/payment").post(orderproductcontroller.payment)
router.route("/paymentverify").post(orderproductcontroller.paymentverify)


module.exports = router;