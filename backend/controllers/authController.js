const User = require('../models/UserModel') 
const ErrorHandler = require('../utils/ErrorHandler'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors') ; 
const sendToken = require('../utils/jwtToken');
const sendMail = require('../utils/sendEmail'); 
const crypto = require('crypto'); 

// inscription d'un nouvel utilisateur 

exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password} = req.body  ; 


    const user = await User.create({
        name, 
        email, 
        password, 
        avatar:{
            public_id:"avatars/1024px-User-avatar.svg.png", 
            url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
        }
    }); 
   
    sendToken(user, 201, res);
}); 


exports.loginUser = catchAsyncErrors( async (req, res, next) => {

    const { email, password} = req.body  ;

    // vérifier que l'email et le passport existent 
    if(!email || !password)
    {
        return next( new ErrorHandler("Please enter an email or passport", 400)); 

    }

    const user = await User.findOne({email}).select("+password"); 

     if(!user)
     {
        return next( new ErrorHandler("cet email existe déjà dans plus tard", 400));
     }
        
     // vérifier que le password est correcte : 
      
     const isPasswordValid = await user.comparePasswords(password); 

     if(!isPasswordValid)
     {
         return next( new ErrorHandler("Identifiants incorrects", 400)) ; 
     }

    sendToken(user, 200, res);

}); 


// envoi de l'email pour réinitialisation de son mot de passe

exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {

    const user = await User.findOne({email:req.body.email}); 
    if(!user)
    {
        return next( new ErrorHandler("User not found", 404)) ; 
    }

    const resetToken = user.getResetPassword(); 

    await user.save({validateBeforeSave:false}); 

    // création de l'url de modification de mot de passe 
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`; 
    
    const message = `voici le lien pour la réinitialisation du mot de passe:\n\n ${resetUrl}. \n\n
     si cette requète n'a pas été envoyé par vous, ignorer la`; 

    try{
        await sendMail({
            email:user.email, 
            subject : "modification du password ",
            message
        }); 

        res.status(200).json({
            success:true, 
            message:`Email envoyé à ${user.email}`
        }); 

    }catch(error)
    {
        this.resetPasswordToken = undefined ;
        this.resetPasswordExpire = undefined ;

        await user.save({validateBeforeSave:false}); 

         return next( new ErrorHandler(error.message, 500)) ; 
    }
}); 



// réinitialiser le mot de password de l'tilisateur 

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
   // crypter le token 
   const resetPasswordToken = crypto.createHash('sha26').update(req.params.token).digest("hex")

   const user = await User.findOne({
       resetPasswordToken, 
       resetPasswordExpire:{ $gt:Date.now()}
   });  

   if(!user)
   {
       return next( new ErrorHandler("Password reset token is invalid pr has been expired!", 400)) ;
   }

   if(req.body.password != req.parms.confirmPassword)
   {
          return next( new ErrorHandler("Password does not macth" ,400)); 
   }


   user.password = req.body.password ; 
})

// se déconnecter à l'application 

exports.logoutUser = catchAsyncErrors( async (req, res, next) => {

    res.cookie('token',null, {
        expires:new Date(Date.now()), 
        httpOnly:true
    }); 

    res.status(200).json({
        success:true, 
        message:"User logout ! "
    }); 
})

// récpérer les données de l'utilisateur courant 

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id); 
    res.status(200).json({
        success:true, 
        user
    }); 
}); 

// modification du password de l'utilisateur 

exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password"); 

    // vérifier si le password de l'utilisateur est bien le meme 
    const ismatch = user.comparePasswords(req.body.password);
    if(!ismatch)
    {
        return next(new ErrorHandler("le password ne correspond pas", 400)); 
    }
    user.password = req.body.password; 
    await user.save(); 
    sendToken(user,200, res); 
}); 

// modifier les informations de son profile 
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const userData = {
        name:req.body.name, 
        email:req.body.email
    };

// update data 
    await User.findByIdAndUpdate(req.user.id, userData, {
        new:true, 
        runValidators:true, 
        useFindAndModify:false
    }); 

    res.status(200).json({
        success:true
    })
})

// récupérer la liste des utilisateurs 
exports.getUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find(); 

    res.status(200).json({
        success:true, 
        users
    }); 
})

// récupérer un user via son id
exports.getUser = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id); 
    if(!user)
    {
        return next(new ErrorHandler(`User does not found via Id: ${req.params.id}`)); 
    }

    res.status(200).json({ 
        success:true, 
        user
    }); 
})

// modifier les données de l'administrateur

exports.updateUser = catchAsyncErrors( async (req,res,  next) => {
    const userData = {
        name:req.body.name, 
        email:req.body.email, 
        role:req.body.role
    };

// update data 
    await User.findByIdAndUpdate(req.user.id, userData, {
        new:true, 
        runValidators:true, 
        useFindAndModify:false
    }); 

    res.status(200).json({
        success:true
    })
})

// supprimer un user 
exports.deleteUser = catchAsyncErrors(async (req, res,next) =>  {
    const user = await User.findById(req.params.id); 

    if(!user) 
    {
        return next(new ErrorHandler(' user does not found !', )); 
    }

    await user.remove(); 

    res.status(200).json({
        success:true, 

    })
}); 