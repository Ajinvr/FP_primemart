const express = require("express");
const router = express.Router();
const auth = require('../middlewares/tokenauth')
const  orderproductcontroller  = require("../controllers/productcontrollers/orderController");

router.route("/getallorders").post(auth,orderproductcontroller.getAllOrders)
router.route("/getAllOrderssearch").post(auth,orderproductcontroller.getAllOrderssearch)
router.route("/getallordersseller").post(auth,orderproductcontroller.getOrdersBySeller)
router.route("/payment").post(auth,orderproductcontroller.payment)
router.route("/paymentverify").post(auth,orderproductcontroller.paymentverify)


module.exports = router;