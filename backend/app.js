const express = require("express");
const app = express();
app.use(express.json())
const productsRoute = require('./routes/produits'); 
const errorMiddleware = require('./middleware/errorsMiddleware'); 


app.use('/api/v1', productsRoute); 
// error middleware implementation 
app.use(errorMiddleware); 
module.exports = app ; 