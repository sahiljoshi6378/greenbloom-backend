import UserModel from "../../models/authmodels/model_userprofile.js";
import {UnAuthorisedAccss} from "../../errors/userautherrors.js";
import bcrypt from "bcrypt";

class userAccountController{
    
    // User account GET-route
    static USER_FETCH_ACCOUNT_DETAILS = async (req,res) =>{
        // user session obj
        const {_UID} = req.session;

        try {
            const user = await UserModel.findOne({UID:_UID["_UID"]});

            if(!user){
                throw new UnAuthorisedAccss();
            }
            
            
            // dispatching session response
            res.status(200).json({
                "SESSION" : {
                    "UID" : user.UID,
                    "twofauth" : user.twofauth,
                    "email" : user.email,
                    "phone" : user.phone,
                    "first_name" : user.first_name,
                    "last_name" : user.last_name,
                    "gender" : user.gender,
                },
                "respone" :{
                    "msg"  : "OK",
                    "desc" : "Valid session",
                    "code" : 200,
                    "isSuccess" : true
                }
            })

        } catch (error) {

            if(error instanceof UnAuthorisedAccss){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    custom_err_msg : error.custom_err_msg,
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


    // User account PATCH-route
    static USER_UPDATE_ACCOUNT_DETAILS = async (req,res) =>{
          // user session obj
          const {_UID} = req.session;
          const {...updates} = req.SANITIZATISED_INPUTES;
         
          try {


            const user = await UserModel.findOneAndUpdate({UID:_UID["_UID"]},{...updates});

            
            if(!user){
                throw new UnAuthorisedAccss("Error while updating user profile");
            }
            
            
            // dispatching session response
            res.status(200).json({
                "SESSION" : {
                    "UID" : user.UID,
                    "twofauth" : user.twofauth,
                    "email" : user.email,
                    "phone" : user.phone,
                    "first_name" : user.first_name,
                    "last_name" : user.last_name,
                    "gender" : user.gender,
                },
                "respone" :{
                    "msg"  : "OK",
                    "desc" : "Valid session",
                    "code" : 200,
                    "isSuccess" : true
            }
        })

        } catch (error) {
            if(error instanceof UnAuthorisedAccss){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    custom_err_msg : error.custom_err_msg,
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


    // User account PATCH-password
    static USER_PASSWORD_UPDATE = async(req,res) =>{
        // user session obj
        const {_UID} = req.session;
        const {...updates} = req.SANITIZATISED_INPUTES;

        // old_password,password,conform_password
        try {


            const DB_RESPONSE = await UserModel.findOne({UID:_UID["_UID"]});
            const isValidPwd = await bcrypt.compare(updates.old_password,DB_RESPONSE.password);
          


            if(!isValidPwd){
                throw new UnAuthorisedAccss();
            }


            


            const new_hashed_pwd = await bcrypt.hash(updates.password,12);
            const user = await UserModel.findOneAndUpdate({UID:_UID["_UID"]},{
                password : new_hashed_pwd
            });


            
            if(!user){
                throw new UnAuthorisedAccss("Error while updating user profile");
            }
            
            
            // dispatching session response
            res.status(200).json({
                "SESSION" : {
                    "UID" : user.UID,
                    "twofauth" : user.twofauth,
                    "email" : user.email,
                    "phone" : user.phone,
                    "first_name" : user.first_name,
                    "last_name" : user.last_name,
                    "gender" : user.gender,
                },
                "respone" :{
                    "msg"  : "OK",
                    "desc" : "Valid session",
                    "code" : 200,
                    "isSuccess" : true
            }
        })

        } catch (error) {
            if(error instanceof UnAuthorisedAccss){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    custom_err_msg : error.custom_err_msg,
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







    // User account DELETE-route
    static USER_DELETE_ACCOUNT = async (req,res) =>{
        // user session obj
        const {_UID} = req.session;

        try {
            const user = await UserModel.findOneAndDelete({UID:_UID["_UID"]});

            if(!user){
                throw new UnAuthorisedAccss();
            }
            
            
            // dispatching session response
            res.status(200).json({
                MSG : "Account has been deleted!!!",
                DESC : "User account has been deleted, also all account related info has been deleted.",
                CODE : 200,
                isSuccess : true
            })

        } catch (error) {

            if(error instanceof UnAuthorisedAccss){
                res.status(401).json({
                    msg  : error.ERR_MSG,
                    desc : error.ERR_DESC,
                    code : error.ERR_CODE,
                    isSuccess : error.SUCCESS,
                    custom_err_msg : error.custom_err_msg,
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

}



export default userAccountController;