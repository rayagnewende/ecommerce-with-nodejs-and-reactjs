const express = require("express");
const app = express();
const productsRoute = require('./routes/produits'); 
const authRoute = require('./routes/auth'); 
const orderRoute = require('./routes/order'); 
const errorMiddleware = require('./middleware/errorsMiddleware'); 
const cookiesParser = require('cookie-parser')


app.use(express.json()); 
app.use(cookiesParser()); 

app.use('/api/v1', productsRoute); 
app.use('/api/v1', authRoute); 
app.use("/api/v1", orderRoute); 

// error middleware implementation 
app.use(errorMiddleware); 
module.exports = app ; 