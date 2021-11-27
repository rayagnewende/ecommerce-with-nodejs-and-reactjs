
// créer et envoyer le token comme un cookie 
const sendToken = (user, status, res) => {

    // création du token 
    const token = user.getJwtToken(); 

    // cookie options 

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 
        ), 
        httpOnly:true
    }

    res.status(status).cookie('token',token,options).json({
        sucess:true,  
        token, 
        user                                                                                                                                                                                                           
    }); 
}



module.exports  = sendToken ; 