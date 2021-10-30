const Product = require('../models/productModel'); 
const dotenv = require('dotenv'); 
const { connect } = require("mongoose"); 

const products = require('../data/products.json'); 

const connectDatabase = require('../config/database'); 
dotenv.config({path:"backend/config/config.env"}); 

connectDatabase(); 

const seedersProject  = async () =>  {
   try{
    await Product.deleteMany(); 
    console.log("les produits ont été base"); 

    await Product.insertMany(products); 
    console.log("les produits ont été bien ajoutés"); 
    process.exit(); 
   }
   catch(error){
        console.log(error.message); 
        process.exit(); 
   }
}


seedersProject(); 
