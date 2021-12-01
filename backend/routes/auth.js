const express = require('express'); 
const router = express.Router(); 
const {isAuthenticatedUser, authorizeUserRoles } = require('../middleware/auth'); 

const { registerUser, 
        loginUser, 
        logoutUser, 
        forgotPassword,
        resetPassword, 
        getUserProfile,
        updateUserPassword, 
        updateProfile,
         getUsers, 
         updateUser,
         getUser,
        deleteUser} = require('../controllers/authController') ; 


router.route("/register").post(registerUser); 
router.route('/login').post(loginUser); 
router.route("/logout").get(logoutUser); 
router.route('/password/forgot').post(forgotPassword); 
router.route('/reset/password:token').put(resetPassword); 
router.route("/me").get(isAuthenticatedUser,getUserProfile) ; 
router.route("/update/password").put(isAuthenticatedUser,updateUserPassword); 
router.route('/me/profile').put(isAuthenticatedUser, updateProfile); 
router.route('/admin/users').get(isAuthenticatedUser, authorizeUserRoles('admin'),isAuthenticatedUser, authorizeUserRoles('admin'), getUsers) ;
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeUserRoles('admin'), getUser); 
router.route('/admin/user/update').put(isAuthenticatedUser,authorizeUserRoles('admin'), updateUser); 
router.route('/admin/user/delete/:id').delete(isAuthenticatedUser,authorizeUserRoles('admin'), deleteUser); 

module.exports = router ;      