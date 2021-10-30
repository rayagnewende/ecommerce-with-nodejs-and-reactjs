const express = require('express'); 
const router = express.Router(); 
const {newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct}  = require("../controllers/productsController"); 


router.route('/products').get(getProducts); 
router.route("/products/new").post(newProduct); 
router.route('/product/:id').get(getSingleProduct); 
router.route('/product/:id').put(updateProduct); 
router.route('/product/:id').delete(deleteProduct); 
module.exports = router ; 
