const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require('jsonwebtoken'); 
const User = require('../models/UserModel');
const ErrorHandler = require("../utils/ErrorHandler");

// vérifier si l'utilisateur est connecté 
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) =>  {

    const { token } =  req.cookies ;                      

    if(!token)
    {
        return next(new ErrorHandler("Login first before access to the app", 401)); 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    req.user = await User.findById(decoded.id); 


      next(); 

}); 


//  

exports.authorizeUserRoles = (...roles)  =>
{
    return (req, res, next) => {
        if(!roles.includes(req.user.role))
        {
            new ErrorHandler(`Role ${req.user.role} is not allow to access this resource!`, 403); 
        }

        next(); 
    }

  
}