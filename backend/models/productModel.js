const mongoose = require("mongoose"); 


const ProductModel = new mongoose.Schema({
    name:{
        type:String, 
        required :[true, "Please enter product name"], 
        trim:true, 
        maxlength:[100, "product name connot exceed 100 characteres"]
    }, 
    price : {
        type:Number, 
        required:[true, "Please enter porduct price"], 
        maxlength:[5, "product price connot exceed 5 characteres"],
        default:0.0
    }, 
    description:{
        type:String, 
        required :[true, "Please enter product description"], 
        trim:true, 
        maxlength:[300, "product name connot exceed 300 characteres"]
    },
    ratings:{
        type:Number, 
        default:0
    }, 
    images:[
        {
            public_id:{
                type:String, 
                required:true
            },
            url:{
                type:String, 
                required:true
            }

        }
    ], 
    user:{
        type:mongoose.Schema.ObjectId, 
        ref:'User',  
        required:true
    }, 
    category:{
        type:String, 
        required:[true, "Please select catgory for this product"], 
        enum: {
            values: [
                'Electronics', 
                "Cameras", 
                "Laptop",
                "Accessories", 
                "Headphones",
                "Food", 
                "Books",
                "Shoes/Clothes",
                "Beauty/Health", 
                "outdoor", 
                "Sport", 
                "Home"
            ], 
            message:"Please select the correct category"
        }, 

    }, 
    seller:{
        type:String, 
        required:[true, "Please enter product seller"]
    }, 
    stock :{
        type:Number, 
        required:true, 
        maxlength:[5, "Please enter product stock"], 
        default:0
    }, 
    numOfReviews:{
        type:Number, 
        default:0
    }, 
    reviews:[
        {
            name:{
                type:String, 
                required:true
            },
            rating:{
                type:Number, 
                required:true
            },
            comment:{
                type:String, 
                required:true
            }
        }
    ], 
    createAt:{
        type:Date, 
        default:Date.now
    }

}); 


module.exports = mongoose.model("Product", ProductModel); 