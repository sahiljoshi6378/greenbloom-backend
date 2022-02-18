import { EmptyInput,ValidatioError,UserAlreadyExist } from "../../errors/commonerors.js";
import UserModel from "../../models/authmodels/model_userprofile.js";
import Common_Utilis from "../../utils/utils_mware_crlrs.js";



class AuthMiddleware{

    // Register FORM_SANITIZATION
    static FORM_SANITIZATION = async (req,res,next) =>{    
        // user given inputs
        const trimed_inputes = Common_Utilis.TRIMED_INPUTES(req.body);
        try {
            try {
           
                req.SANITIZATISED_INPUTES  = await Common_Utilis.JOI_VALIDATION(trimed_inputes,req.BYPASS_VALIDATION);   
               
            } catch (error) {
                if(error.ERR_TYPE_CODE === "CustomValidationError_Validation"){
                    throw new ValidatioError();
                }
                if(error.ERR_TYPE_CODE === "CustomValidationError_Empty_Inputes"){
                    throw new EmptyInput();
                }
            }


            // Request validation successfull, forwarding the request next Middleware
            next();

        } catch (error) {
            if(error instanceof EmptyInput || ValidatioError){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error : error.Parent_Error
                })
            }else{
                res.status(500).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error generated while Validating user inputes.",
                    code : 500,
                    isSuccess : false,
                    Parent_Error : "UnknownError while Validating user inputes."
                })
            }
        }
    } 


    static DUPLICATE_USER_CHECK = async (req,res,next) =>{
        const  SANITIZATISED_INPUTES = req.SANITIZATISED_INPUTES; 
     
     
        try {
              //checking if user already exist,
   
            const db_mail = await UserModel.findOne({email:SANITIZATISED_INPUTES.email});
            const db_phone = await UserModel.findOne({phone:SANITIZATISED_INPUTES.phone});
            
    
            if(db_mail || db_phone){
                throw new UserAlreadyExist();
            }
          
            // Request validation successfull, forwarding the request next AuthController
            next();
        } catch (error) {
            if(error instanceof UserAlreadyExist){
                res.status(404).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    Parent_Error : error.Parent_Error
                })
            }else{
               
                res.status(500).json({
                    msg  : "UNKOWN ERROR",
                    desc : "Error generated while checking Duplicate User.",
                    code : 500,
                    isSuccess : false,
                    Parent_Error : "UnknownError while checking Duplicate User."
                })
            }
        }
    }

}



// exporting default
export default AuthMiddleware;