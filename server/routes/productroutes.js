const express = require("express");
const router = express.Router();
const auth = require("../middlewares/tokenauth");
const addfile = require("../middlewares/filesave")
const cartController = require("../controllers/productcontrollers/cartcontroller");
const addProductsController = require("../controllers/productcontrollers/ProductController");
const order = require("../controllers/productcontrollers/orderController")

router.route('/cart').post(auth,cartController.addtocart).get(auth,cartController.getcart).delete(auth,cartController.modifycart).put(auth,cartController.modifycart);
router.route('/addproduct').post(auth,addfile,addProductsController.addProducts);
router.route('/allproducts').get(addProductsController.allProducts);
router.route('/order').post(order.orderproductcontroller).get(order.getorders);


module.exports = router;
