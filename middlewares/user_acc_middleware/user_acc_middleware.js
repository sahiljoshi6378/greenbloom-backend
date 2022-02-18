import {InvalidSessionError,ExpiredSession,UnAuthorisedAccss} from "../../errors/userautherrors.js";
import {SessModel} from "../../models/authmodels/modle_session.js";
import UserModel  from "../../models/authmodels/model_userprofile.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";

class userAccountMiddleware{
    // User account GET-route
    static USER_SESSION_VALIDATOR = async (req,res,next) =>{
        
        // filtring user JWT token
        const HEADRS_TOKEN = req.headers.cookie ? req.headers.cookie : null; 
        const  SESSION_TOKEN = HEADRS_TOKEN !== null ?  HEADRS_TOKEN.split("=")[1] : null;
      
        try {
            // checking if Token is not present.
            if(!SESSION_TOKEN){
                throw new InvalidSessionError();
            }


            // validating Token
            const isValidSession = await SessModel.findOne({session_token:SESSION_TOKEN});
            

            if(!isValidSession){
                throw new ExpiredSession();
            }

            // scraping JWTtoken
            const user_obj =  Jwt.verify(SESSION_TOKEN,process.env.TOKEN_SECRET);
            
            // forwarding request
            req.session = user_obj; 
            next()

        } catch (error){
            if(error instanceof InvalidSessionError || ExpiredSession){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error:error.Parent_Error
                })
            }else{
                res.status(401).json({
                    msg  : "UNKNOWN ERROR",
                    desc : "UN-authorised access",
                    code : 401,
                    isSuccess : false,
                    Parent_Error: "N/A"
                })
            }
        }
    }

    static USER_INPUT_VALIDATOR = async (req,res,next) =>{
        const PATCH_TYPE = req.PATCH_TYPE;
    
        // user permissions
        const USER_PERMISSIONS = {
             PROFILE_PATCH : ["first_name","last_name","gender","twofauth"],
             LOGIN_INFO_PATCH   : ["email","phone"],
             PASSWORD_PATCH     : ["old_password","password","confirm_password"],
             ACTIVATION_STATUS_PATCH : ["password","isDeactivated"]
        };



        
        let keys_res;
        const {_UID} = req.session;
        const {...params} = req.body; 

        try {

            if(_UID["roal"] === "user" && _UID["isAdmin"] === false){
                keys_res = Object.keys(params).map(key =>{
                    return USER_PERMISSIONS[PATCH_TYPE].indexOf(key) === -1 ? false : true
                });
            }else{
              
                throw new UnAuthorisedAccss();
            }

            // validating action
            if(keys_res.some(key => key === false)){
                throw new UnAuthorisedAccss();
            }            
          
            // Forwardind request
            next();
            




        } catch (error) {
            if(error instanceof UnAuthorisedAccss){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error:error.Parent_Error
                    
                })
            }else{
                res.status(905).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error while updating user profile.",
                    code : 401,
                    isSuccess : false
                })
            }
        }

    }

    // User account DELETE-route
    static USER_ACC_DELETE_ACCESS_BLOCKER = async (req,res,next) =>{
        const {email,password} =  req.body;
        const {_UID} =  req.session;

        try {
          

            if(!email || !password){
                throw new Error();
            }


            const DB_RESPONSE = await UserModel.findOne({UID:_UID["_UID"]});

        
            if(!DB_RESPONSE){
                throw new Error();
            }


            const upwd = await bcrypt.compare(password,DB_RESPONSE.password);
            const uemail = email === DB_RESPONSE.email; 
            const uUID = _UID["_UID"] === DB_RESPONSE.UID;

         

            if(upwd === false || uemail === false || uUID === false){
                throw new Error();
            }

            next();

        } catch (error) {
            res.status(400).json({
                msg : "BAD REQUEST",
                desc : "account cannot be deleted due to invalid credintials.",
                code : 400,
                isSuccess : false,
                ERR :error
            })
        }
        
    }
}



export default userAccountMiddleware;

