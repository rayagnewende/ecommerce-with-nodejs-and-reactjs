const Product = require('../models/productModel'); 
const ErrorHandler = require('../utils/ErrorHandler'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); 

exports.newProduct = catchAsyncErrors(async (req, res, next ) => {

    const product = await Product.create(req.body); 

    return res.status(201).json({
        success: true, 
        product
    }); 
}); 

// get all products via  /api/v1/products
exports.getProducts = catchAsyncErrors(async  (req, res, next) => {
    const products = await Product.find(); 
    res.status(200).json({
        success:true, 
        count : products.length,
        products:products
    }); 
}); 

// get a single product detail via /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id); 
    if(!product)
    {
       next(new ErrorHandler("product not found", 404)); 
    }

    res.status(200).json({
        success:true, 
        product:product
    }); 
});

// update a product via /api/v1/product/:id 
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id); 
    if(!product)
    {
        next(new ErrorHandler("product not found", 404)); 
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
                                                                                                                                                                                               
})


// delet a product via /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById({_id:req.params.id}); 
      if(!product)
      {
        next(new ErrorHandler("product not found", 404)); 
      }
    await product.remove();
    res.status(400).json({
        success:true, 
        message:"product is deleted"
    })
}); 