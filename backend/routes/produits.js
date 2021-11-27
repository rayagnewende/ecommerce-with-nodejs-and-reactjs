const express = require('express'); 
const router = express.Router(); 
const {newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct}  = require("../controllers/productsController"); 

const { isAuthenticatedUser, authorizeUserRoles } = require("../middleware/auth"); 

router.get('/products',getProducts); 
router.route('/product/:id').get(getSingleProduct); 

router.route("/products/new").post(isAuthenticatedUser,authorizeUserRoles("admin"),newProduct); 
router.route('/product/:id').put(isAuthenticatedUser,authorizeUserRoles("admin"),updateProduct); 
router.route('/product/:id').delete(isAuthenticatedUser,authorizeUserRoles("admin"),deleteProduct); 
module.exports = router ; 
