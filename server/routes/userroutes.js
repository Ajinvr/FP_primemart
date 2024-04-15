const express = require('express')
const router = express.Router()
const normaluser = require('../controllers/usercontrollers/normalusers')
const auth = require('../middlewares/tokenauth')

router.route('/signup').post(normaluser.signup)
router.route('/login').post(normaluser.login)
router.route('/allusers').get(normaluser.allusers)
router.route('/user/modifyrole/:id').put(auth,normaluser.updateuserrole)
router.route('/allusersearch').post(normaluser.allusersserch)


module.exports = router;