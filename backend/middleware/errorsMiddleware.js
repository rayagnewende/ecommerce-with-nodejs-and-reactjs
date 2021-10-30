


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


    res.status(err.statusCode).json({
        success:false, 
        error: err.stack
    });
}

