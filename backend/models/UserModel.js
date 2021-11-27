const mongoose = require('mongoose'); 
const validator = require('validator')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const crypto = require('crypto'); 

const UserShema = new mongoose.Schema({
    name: {
        type:String, 
        required:[true, "Please enter your Name"],
        maxlength:[30, "your name does not exceed 30 characters"]
    }, 
    email : {
        type:String, 
        required:[true, "Please enter your email"], 
        unique:true, 
        validate:[validator.isEmail, "Pplease enter a valid email"]
    }, 
    password : {
        type:String, 
        required:[true, "Please enter your password"],
        minlength:[6, "your password does not exceed 30 characters"], 
        select:false
    }, 
    avatar:{
        public_id:{
            type:String, 
            required:true
        }, 
        url:{
            type:String, 
            required:true
        }
    }, 
    role:{
        type:String , 
        required:true, 
        default:"user"
    }, 
    createdAt:{
        type:Date, 
        default:Date.now
    }, 
    resetPasswordToken: String,
    resetPasswordExpire:Date
})
// crypté le mot de passe avant la sauvegarde du document
UserShema.pre('save' , async function(next) {
      if(!this.isModified("password"))      
      {
          next(); 
      } 
      this.password = await bcrypt.hash(this.password,10);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}); 

// généré un token après  la création du document 

UserShema.methods.getJwtToken = function() {
    return jwt.sign({id:this.id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN 
    });
}

// vérifier si le password entré par le user est corect : 
   UserShema.methods.comparePasswords = async  function( newPass )
   {
       return await bcrypt.compare(newPass, this.password); 
   }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
// générer un token pour la modificaton du mot de passe 

UserShema.methods.getResetPassword = function() {
    // création du token 
    const resetToken = crypto.randomBytes(20).toString('hex'); 

    //hacher la token créé 
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
    // date d'expiration du token 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 ; 
    return resetToken ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

module.exports = mongoose.model('User', UserShema);