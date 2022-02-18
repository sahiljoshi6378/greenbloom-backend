import express from "express";

// importing controllers and middlewares
import AuthMiddleware from "../../middlewares/auth/authmoddleware.js";
import AuthController from "../../controllers/auth/authcontroller.js";


// router instance
const router = express.Router();






// register route
router.post('/register',((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),AuthMiddleware.FORM_SANITIZATION,AuthMiddleware.DUPLICATE_USER_CHECK,AuthController.REGISTER_CONTROLLER)



// login route
router.post('/login',((req,res,next) => {
    req.BYPASS_VALIDATION = true
    next();
}),AuthMiddleware.FORM_SANITIZATION,AuthController.LOGIN_CONTROLLER);



// auth-status route
router.post('/authstatus',((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),AuthMiddleware.FORM_SANITIZATION,AuthController.AUTH_STATUS);




// send-otp route
router.post('/sendotp',((req,res,next) => {
    req.BYPASS_VALIDATION = false
    next();
}),AuthMiddleware.FORM_SANITIZATION,AuthController.SENT_OTP);




// login-with-otp route
router.post('/loginwithotp',((req,res,next) => {
    req.BYPASS_VALIDATION = true
    next();
}),AuthMiddleware.FORM_SANITIZATION,AuthController.LOGIN_WITH_OTP);



// exporting default router
export default router;

