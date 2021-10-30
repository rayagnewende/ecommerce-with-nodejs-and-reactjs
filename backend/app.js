const express = require("express");
const app = express();
app.use(express.json())
const productsRoute = require('./routes/produits'); 

app.use('/api/v1', productsRoute); 

module.exports = app ; 