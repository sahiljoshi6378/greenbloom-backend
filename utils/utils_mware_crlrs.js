import { CustomValidationError } from "../errors/commonerors.js";

import validator from "validator";
import Jwt  from "jsonwebtoken";
import Joi from "joi";
import { nanoid } from "nanoid";
class Common_Utilis{
    
    
    // Generate OTP
    static generateOTP = () =>{
        return  Math.floor(100000 + Math.random() * 900000);
    }



    // Generate UID
    static generateUID = (pnumber) =>{
        const number = String(pnumber);
        const months = ["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"]
        return `ACC${Math.floor(Date.now() / 1000)}${months[new Date().getUTCMonth()]}${number.slice(5,9)}`;
    }

    static Product_counter = 1;


    // Generate PID
    static generatePID = () =>{
        // updating counter
        Common_Utilis.Product_counter++;
        let UNIQUE_STORE_ID = 'GB3300IN';
        const months = ["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"];
        return  `PID${Math.floor(Date.now()/1000)}${nanoid(10)}${UNIQUE_STORE_ID}${Common_Utilis.Product_counter}`;
    }


    static generateAuthToken =  (_UID,isAdmin,roal) =>{
        try {
            const token =  Jwt.sign({_UID,isAdmin,roal},process.env.TOKEN_SECRET);
            return token;
            
        } catch (error) {
            
            throw new Error();
        }
    } 

    // Trimed inputes
    static TRIMED_INPUTES = (body) =>{
        const trimed_inputes = {};
        

        for(let[key,value] of Object.entries(body)){
            value ? trimed_inputes[key] = value : trimed_inputes[key] = null;
        };
        
        //returning the trimed inputes object
        return trimed_inputes;
    }



    // Joi Validation
    static JOI_VALIDATION = async (params,BYPASS_VALIDATION=false) =>{
        let isValid = null;
        // validating if inputes are empty
        Object.entries(params).forEach(([key,value])=>{
            if(!value){
                throw new CustomValidationError(
                    "CustomValidationError_Empty_Inputes",
                    "CustomValidationError for Emptry inputes passed."
                    );
                }
        })

       
       
        // input validation schema
        const schema = Joi.object({
            old_password : Joi.string(),
            first_name : Joi.string().min(3).max(15),
            last_name : Joi.string().min(3).max(15),
            gender : Joi.string().valid('male','female'),
            twofauth : Joi.string().valid("true","false"),
            isDeactivated : Joi.string().valid("true","false"),
            email : Joi.string().email(),
            phone : Joi.string().regex(new RegExp(/[6-9]\d{9}/)),
            loginID :  params["loginID"] ?  validator.isEmail(params["loginID"]) ?  Joi.string().email() : Joi.string().regex(new RegExp(/[6-9]\d{9}/)) : null, 
            password : Joi.string().min(3).regex(
                new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,30})/)
            ),
            confirm_password : Joi.ref('password')
        });
     
        if(BYPASS_VALIDATION === false){
            try {
                isValid = await schema.validateAsync({...params});
                return isValid;
            }catch (error) {
                // ONLY FOR DEBUG
                // console.log(error)
                throw new CustomValidationError(
                    "CustomValidationError_Validation",
                    `${error.details[0].context.label} is Not Validated.`
                    )
            }
        }if(BYPASS_VALIDATION === true){
            return isValid = params;
        }
    }    


    // Blocker for ADMIN ONLY ROUTES
    static ADMIN_ONLY_ACCESS = (req,res,next) =>{
        const {_UID} = req.session;
        
        try {
            if(_UID.roal !== "admin" ||  _UID.isAdmin !== true){
                // access denied
                throw new Error();
                
            }    

         
            next()
        } catch (error) {
            res.end(`Cannot get ${req.path}`);
        }
        

        
       
    }
}




export default Common_Utilis;