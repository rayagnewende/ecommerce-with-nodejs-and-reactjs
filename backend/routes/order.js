const express = require('express'); 
const router = express.Router(); 
const {isAuthenticatedUser, authorizeUserRoles } = require('../middleware/auth'); 
const { newOrder, getOrder, userOrders, getAllOrders} = require('../controllers/orderController'); 

router.route("/order/new").post(isAuthenticatedUser,newOrder); 
router.route("/order/:id").get(isAuthenticatedUser,getOrder); 

router.route("/orders/me").get(isAuthenticatedUser,userOrders); 

router.route("/admin/orders").get(isAuthenticatedUser,authorizeUserRoles('admin'), getAllOrders); 



module.exports = router ; 