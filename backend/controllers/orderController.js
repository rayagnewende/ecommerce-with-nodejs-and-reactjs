const Order = require('../models/OrderModel'); 
const Product = require('../models/productModel'); 

const ErrorHandler = require('../middleware/errorsMiddleware'); 
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 



// création d'une commande 

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxePrice, 
        shippingPrice, 
        totalPrice
    } = req.body ; 

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxePrice, 
        shippingPrice, 
        totalPrice, 
        paidAt:Date.now(), 
        user:req.user._id
    }); 

    res.status(200).json({
        success:true, 
        order
    })
})

// get a single order 


exports.getOrder = catchAsyncErrors(async (req, res, next) => {
 
    const order = await Order.findById(req.params.id).populate("user", "name email"); 

    if(!order)
    {
        return next(new ErrorHandler('Order does not found !', 404)); 
    }

    res.status(200).json({
        success:true, 
        order
    })
})

//  récupérer la liste des commandes de l'utilisateur cnnecté 

exports.userOrders = catchAsyncErrors(async (req, res, next) => {
 const orders = await Order.find({user:req.user.id}); 

    res.status(200).json({
        success:true, 
        orders
    })
})

// récupérer la liste de toutes les commandes 
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find(); 
     let totalAmount=0; 
     orders.forEach( order => {
         totalAmount +=order.totalPrice ; 
     })
       res.status(200).json({
           success:true, 
           totalAmount,
           orders
       })
   })

   // mettre à jour  une commande 
   exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
       const order = await Order.findById(req.params.id);

       if(orderorderStatus === "Delivered")
       {
           return next(new ErrorHandler("Vous avez dejà livrer cette commande",400))
       }

       order.orderItems.forEach( item => {
           await updateStock(item.product, item.quantity);
       } )



       res.status(200).json({
           success:true, 
           order
       })
   })