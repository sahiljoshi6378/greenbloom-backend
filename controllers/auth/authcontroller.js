import UserModel from  "../../models/authmodels/model_userprofile.js";
import otpModel from "../../models/authmodels/otpauth.js";
import {SessModel} from "../../models/authmodels/modle_session.js";
import {RegistrationError,UserNotFound,EmptyInput, OtpNotSent,OtpGenerationError,InvalidOtpError,JwtGenerationError,SessionGenerationError} from "../../errors/commonerors.js";
import bcrypt from "bcrypt";
import {SEND_MOBILE_SMS,SEND_MAIL} from "../../utils/services_mail.js";
import Common_Utilis from "../../utils/utils_mware_crlrs.js";
import validator from "validator";


class AuthController{

    // Register controller
    static REGISTER_CONTROLLER = async(req,res) =>{
        const {email,phone,password} = req.SANITIZATISED_INPUTES;
        try {

            // creating new user instance
            const db_response = await new UserModel({
                email,
                phone,
                password,
                UID : Common_Utilis.generateUID(phone)
            });

            try {
                // saving new user instance into DB
                await db_response.save();    
            } catch (error) {
                throw new RegistrationError();
            }
            
                


            // sending response
            res.status(200).json({
                msg   : "user registred!",
                desc : "User has been registred.",
                code : 200,
                isSuccess : true
            });


        } catch (error) {
           
            if(error instanceof RegistrationError){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error:error.Parent_Error
                    
                })
            }else{
                res.status(500).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error generated while Registration user.",
                    code : 500,
                    isSuccess : false,
                    Parent_Error : "UnknownError while Registration user."
                })
            }
            
        }
    }





    // Login controller
    static LOGIN_CONTROLLER = async (req,res) =>{
        let DB_RESPONSE;
        let JWT_TOKEN_INSTANCE; 
        const {loginID,password} = req.SANITIZATISED_INPUTES;
        const LOGIN_ID_TYPE = validator.isEmail(loginID) ? "email" : "phone";
        try {
            // validating user into the database
            if(LOGIN_ID_TYPE === "phone"){
                DB_RESPONSE =  await UserModel.findOne({phone:loginID});
            }

            if(LOGIN_ID_TYPE === "email"){
                DB_RESPONSE =  await UserModel.findOne({email:loginID});
            }
            

            if(!DB_RESPONSE){
                throw new UserNotFound();
            }



            const  isLoginIdMatched = DB_RESPONSE[`${LOGIN_ID_TYPE}`] === loginID;
            const  isPwdMatched =  await bcrypt.compare(password,DB_RESPONSE.password);

          
            if(!isLoginIdMatched || !isPwdMatched){
                throw new UserNotFound();
            }


            // generating new JWT token
            try {
                JWT_TOKEN_INSTANCE =  Common_Utilis.generateAuthToken({
                    _UID : String(DB_RESPONSE.UID),
                    isAdmin : DB_RESPONSE.isAdmin,
                    roal:DB_RESPONSE.roal
                });
                } catch (error) {
                    // handling error for jwt token generation
                    throw new JwtGenerationError();
                }



                // creating new session instance
                const SESS_DB_RESPONSE = await new SessModel({
                    session_token:JWT_TOKEN_INSTANCE,
                    ACCOUNT_UID : DB_RESPONSE.UID,
                    roal :DB_RESPONSE.roal,
                    isAdmin:DB_RESPONSE.isAdmin
                });




                // saving session into DB
                try {
                    await SESS_DB_RESPONSE.save();    
                } catch (error) {
                    // handling error for saving session into DB
                    throw new SessionGenerationError()
                }
                

              

                // setting up cookie with expiretion time of 30 days.
                res.cookie("SESSION_TOKEN",JWT_TOKEN_INSTANCE,{
                    expires : new Date(Date.now() + 2589200000),
                    httponly:true,
                });

                
                

                // Dispatching response
                res.status(200).json({
                   "SESSION" : {
                        "UID" : DB_RESPONSE.UID,
                        "twofauth" : DB_RESPONSE.twofauth,
                        "email" : DB_RESPONSE.email,
                        "phone" : DB_RESPONSE.phone,
                        "first_name" : DB_RESPONSE.first_name,
                        "last_name" : DB_RESPONSE.last_name,
                        "gender" : DB_RESPONSE.gender,
                        // TODO : replace the ID's with array of items.
                        "USER_CART" : DB_RESPONSE.user_db_references.CART_BUCKET_ID,
                        "USER_NOTIFICATIONS" : DB_RESPONSE.user_db_references.NOTIFICATION_BUCKET_ID,
                        "USER_WISH_BUCKET" : DB_RESPONSE.user_db_references.WISH_BUCKET_ID,
                        "USER_ORDERS_BUCKET" : DB_RESPONSE.user_db_references.ORDERS_BUCKET_ID,
                   },
                   "respone" :{
                        "msg"  : "Login success",
                        "desc" : "Logged in success.",
                        "code" : 200,
                        "isSuccess" : true
                   }
                })
        }catch (error) {
            if(error instanceof UserNotFound || SessionGenerationError || JwtGenerationError){
                res.status(400).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error:error.Parent_Error
                })
            }else{
                res.status(500).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error generated while Login user.",
                    code : 500,
                    isSuccess : false,
                    Parent_Error : "UnknownError while Login user."
                })
            }
            
        }

    }



    // Auth status
    static AUTH_STATUS = async (req,res) =>{
        let DB_RESPONSE;
        const {loginID} = req.SANITIZATISED_INPUTES;
        const LOGIN_ID_TYPE =  loginID ?  validator.isEmail(loginID) ? "email"  : "phone" : null;

        try {
            if(LOGIN_ID_TYPE == "phone"){
                DB_RESPONSE =  await UserModel.findOne({phone:loginID});
            }

            if(LOGIN_ID_TYPE == "email"){
                DB_RESPONSE =  await UserModel.findOne({email:loginID});
            }
            


            if(!DB_RESPONSE){
                throw new UserNotFound();
            }


            res.status(200).json({
                msg : "OK",
                code : 200,
                LOGIN_ID_TYPE : loginID,
                isValid : true
            });


        } catch (error) {
            if(error instanceof  UserNotFound ){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error:error.Parent_Error
                })
            }else{
                res.status(500).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error generated checking user auth status.",
                    code : 500,
                    isSuccess : false,
                    Parent_Error : "UnknownError while checking user auth status."
                })
            }       
        }

    }



    // send OTP
    static SENT_OTP = async (req,res) =>{
        let msg_clent_res;
        const {loginID} = req.SANITIZATISED_INPUTES;
        const LOGIN_ID_TYPE =  loginID ?  validator.isEmail(loginID) ? "email"  : "phone" : null;
      
        try {
            // generating new OTP
            const generated_OTP = Common_Utilis.generateOTP();
            

            if(generated_OTP instanceof Error){
                throw new OtpGenerationError();
            }

        

            // Message body for mobile otp service
            const MOBILE_MSG_OTP_BODY = `${generated_OTP} is your GreenBloom otp and is valid for 10 minutes. Do not share with anyone. Regards GreeBloom.com #${generated_OTP}`;
            

           
            try{
                if(LOGIN_ID_TYPE==="phone"){
                    msg_clent_res = await SEND_MOBILE_SMS(MOBILE_MSG_OTP_BODY,loginID);
                }
                if(LOGIN_ID_TYPE==="email"){
                    msg_clent_res =  await SEND_MAIL(
                        loginID,
                        `GreenBloom Account - ${generated_OTP} is your verification code for secure access`,
                        {YOUR_OTP:generated_OTP}
                    );
                }
            }catch(error){
                throw new OtpNotSent();
            }

            
            const DB_RESPONSE = await new otpModel({
                AUTH_OTP_ID  : msg_clent_res.messageId ? msg_clent_res.messageId : msg_clent_res.sid,
                OTP: generated_OTP,
                LOGIN_ID : loginID,
                LOGIN_ID_TYPE : LOGIN_ID_TYPE
            });


            try {
                await DB_RESPONSE.save();    
            } catch (error) {
                throw new InsertionError();
            }
                

            res.status(200).json({
                server : "GreenBloom OPT services",
                SUCCESS : true,
                otpID : DB_RESPONSE.AUTH_OTP_ID,
                LOGIN_ID : DB_RESPONSE.LOGIN_ID,
                LOGIN_ID_TYPE : DB_RESPONSE.LOGIN_ID_TYPE
            })



        } catch (error) {
            if(error instanceof EmptyInput || InsertionError || OtpNotSent || OtpGenerationError){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    server : "GreenBloom OPT services",
                    isSuccess : error.SUCCESS,
                    Parent_Error : error.Parent_Error
                })
            }else{
                res.status(404).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error while sending otp.",
                    code : 404,
                    server : "GreenBloom OPT services",
                    isSuccess : false
                })
            }
        }
    }


    // login with otp
    static LOGIN_WITH_OTP = async (req,res) =>{
        let DB_RESPONSE;
        let JWT_TOKEN;
        const {otp,otpID,loginID} = req.SANITIZATISED_INPUTES;
        let LOGIN_ID_TYPE = loginID ?  validator.isEmail(loginID) ? "email" : "phone" :null; 
        


        try {

            if(LOGIN_ID_TYPE=="email"){
                DB_RESPONSE =  await UserModel.findOne({email:loginID});
            }

            if(LOGIN_ID_TYPE=="phone"){
                DB_RESPONSE = await UserModel.findOne({phone:loginID});
            }



            if(!DB_RESPONSE){
                throw new UserNotFound();
            }



    
            // retriving otp from DB
            const DB_RESPONSE_OTP = await otpModel.findOne({AUTH_OTP_ID:otpID});


            //otp validation 
            if(!DB_RESPONSE_OTP || DB_RESPONSE_OTP.OTP != otp){
                throw new InvalidOtpError();
            }

    

            // deleting the otp document
            await otpModel.deleteOne({AUTH_OTP_ID:otpID});


            try {
                JWT_TOKEN =  Common_Utilis.generateAuthToken({
                    _UID : String(DB_RESPONSE.UID),
                    isAdmin : DB_RESPONSE.isAdmin,
                    roal:DB_RESPONSE.roal
                });
            } catch (error) {
                throw new JwtGenerationError();
            }
        
           
            const sess_db_res = await new SessModel({
                session_token:JWT_TOKEN,
                ACCOUNT_UID : DB_RESPONSE.UID,
                roal :DB_RESPONSE.roal,
                isAdmin:DB_RESPONSE.isAdmin
            });

         

            try{
                const  res = await sess_db_res.save();
            }catch(error){
                throw new SessionGenerationError(); 
            }
            

      
            // setting up cookies
            res.cookie("SESSION_TOKEN",JWT_TOKEN,{
                expires : new Date(Date.now() + 2589200000),
                httponly:true
            });

           

            // dispatching session response
            res.status(200).json({
                "SESSION" : {
                     "UID" : DB_RESPONSE.UID,
                     "twofauth" : DB_RESPONSE.twofauth,
                     "email" : DB_RESPONSE.email,
                     "phone" : DB_RESPONSE.phone,
                     "first_name" : DB_RESPONSE.first_name,
                     "last_name" : DB_RESPONSE.last_name,
                     "gender" : DB_RESPONSE.gender,
                     "user_references" : DB_RESPONSE.user_db_references
                },
                "respone" :{
                     "msg"  : "Login success",
                     "desc" : "Logged in success.",
                     "code" : 200,
                     "isSuccess" : true
                }
             })

        } catch (error) {
            if(error instanceof  InvalidOtpError || SessionGenerationError || JwtGenerationError || UserNotFound){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error : error.Parent_Error
                })
            }else{
                res.status(404).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error while loggin in the user.",
                    code : 404,
                    isSuccess : false
                })
            }
            
        }
    }

}


// exporting default
export default AuthController