import express from "express";


// router instance
const router = express.Router();
// importing Middlewares and controllers
import userAccountMiddleware from  "../../middlewares/user_acc_middleware/user_acc_middleware.js";
import userAccountController from "../../controllers/user_acc_controller/user_acc_controller.js";
import AuthMiddleware from "../../middlewares/auth/authmoddleware.js";




// User account related routes
router.get("/info",
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountController.USER_FETCH_ACCOUNT_DETAILS);







// profile patch route
router.patch("/info/update/profile",((req,res,next) =>{
    req.PATCH_TYPE = "PROFILE_PATCH",
    next();
}),
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountMiddleware.USER_INPUT_VALIDATOR,((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),AuthMiddleware.FORM_SANITIZATION,userAccountController.USER_UPDATE_ACCOUNT_DETAILS);







// login info patch route
router.patch("/info/update/login",((req,res,next) =>{
    req.PATCH_TYPE = "LOGIN_INFO_PATCH",
    next();
}),
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountMiddleware.USER_INPUT_VALIDATOR,((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),
AuthMiddleware.FORM_SANITIZATION,
AuthMiddleware.DUPLICATE_USER_CHECK,
userAccountController.USER_UPDATE_ACCOUNT_DETAILS);









// password patch route
router.patch("/info/update/pwd",((req,res,next) =>{
    req.PATCH_TYPE = "PASSWORD_PATCH",
    next();
}),
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountMiddleware.USER_INPUT_VALIDATOR,((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),AuthMiddleware.FORM_SANITIZATION,
userAccountController.USER_PASSWORD_UPDATE);







// account-active status patch route
router.patch("/info/deactivate",((req,res,next) =>{
    req.PATCH_TYPE = "ACTIVATION_STATUS_PATCH",
    next();
}),
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountMiddleware.USER_INPUT_VALIDATOR,((req,res,next) => {
    req.BYPASS_VALIDATION = true
    next();
}),AuthMiddleware.FORM_SANITIZATION,
userAccountController.USER_UPDATE_ACCOUNT_DETAILS);





// account-delete route
router.delete("/delete",
userAccountMiddleware.USER_SESSION_VALIDATOR,
userAccountMiddleware.USER_ACC_DELETE_ACCESS_BLOCKER,
userAccountController.USER_DELETE_ACCOUNT);





// exporting default route
export default router;







