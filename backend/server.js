

const app = require("./app"); 
const dotenv = require('dotenv');
const connectDatabase  = require('./config/database'); 

// configuration de l'environnement
dotenv.config({path:"backend/config/config.env"}); 

// connexion à la base de données 
connectDatabase() ; 
app.listen(process.env.PORT, () => {
    console.log(`app executée sur le port ${process.env.PORT} en mode ${process.env.NODE_ENV}`)
})