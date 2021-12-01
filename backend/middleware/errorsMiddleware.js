


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500 ; 
  
    if(process.env.NODE_ENV == "DEVELOPMENT")
    {
        res.status(err.statusCode).json({
            success:false, 
            message: err.message, 
            error: err , 
            stack : err.stack

        }); 
    }
    
    if(process.env.NODE_ENV == "PRODUCTION")
    {
        let error = {...err}; 
        error.message = err.message ; 
        res.status(error.statusCode).json({
            success:false , 
            message: error.message || 'internal Server error'
            
        }); 
    }
   
    // gérer le message d'erreur concernant la duplication de clés
  if( err.code === 11000)
  {
      const message = `Duplicate ${Object.keys(err.keyValue)}  is entered`; 
      error = new ErrorHandler(message, 400); 

  }
// gérer le message d'erreur d'un jeton ou tekon 
if( err.name === "JsonWebTokenError")
{
    const message = `Json web token  is invalid, try again`; 
    error = new ErrorHandler(message, 400); 

}

if( err.name === "TokenExpiredError")
{
    const message = ` token  is expired , try again`; 
    error = new ErrorHandler(message, 400); 

}
// gérer l'expiration des token 




    res.status(err.statusCode).json({
        success:false, 
        error: err.stack
    });
}

