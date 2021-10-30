const Product = require('../models/productModel'); 

exports.newProduct = async (req, res, next ) => {

    const product = await Product.create(req.body); 

    return res.status(201).json({
        success: true, 
        product
    }); 
}
// get all products via  /api/v1/products
exports.getProducts = async  (req, res, next) => {
    const products = await Product.find(); 
    res.status(200).json({
        success:true, 
        count : products.length,
        products:products
    }); 
}

// get a single product detail via /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id); 
    if(!product)
    {
        res.status(404).json({
            success:false, 
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true, 
        product:product
    }); 
}
// update a product via /api/v1/product/:id 
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id); 
    if(!product)
    {
        res.status(404).json({
            success:false, 
            message:"product not found"
        })
    }
    
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true, 
        runValidators:true, 
        useFindAndModify:false
    }); 

    res.status(200).json({
        success:true, 
        product:product
    });
                                                                                                                                                                                               
}