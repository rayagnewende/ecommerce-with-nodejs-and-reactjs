const mongoose = require('mongoose'); 

const mongoDatabase = () =>  {
    mongoose.connect("mongodb+srv://admin1:admin1@cluster0.xoame.mongodb.net/ecommercedb",
        { useNewUrlParser: true,
          useUnifiedTopology: true })
            .then( con => {
                  console.log(`La base de données de mongodb s'est bien connectée  ${con.connection.host}`); 
            })
            .catch( error => {
                console.log("la connexion à Mongod a échoué"); 
            })
}



module.exports = mongoDatabase ; 






