const express = require("express");
const router = express.Router();
const normaluser = require("../controllers/usercontrollers/normalusers")


router.route('/signup').post(normaluser.signup)
router.route('/login').post(normaluser.login)


module.exports = router