class InvalidSessionError{
    constructor(){
        this.ERR_MSG  =  "Token not found",
        this.ERR_DESC =  "Session token not found"
        this.ERR_CODE =  401,
        this.SUCCESS = false,
        this.Parent_Error = "InvalidSessionError Error"
    }
}


class ExpiredSession{
    constructor(){
        this.ERR_MSG  =  "Invalid Session Token",
        this.ERR_DESC =  "Session Has been Expired."
        this.ERR_CODE =  401,
        this.SUCCESS = false,
        this.Parent_Error = "ExpiredSession Error"
    }
}


class UnAuthorisedAccss{
    constructor(custom_err_msg=null){
        this.ERR_MSG  =  "Un-Authorised access",
        this.ERR_DESC =  "access denied"
        this.ERR_CODE =  401,
        this.SUCCESS = false,
        this.custom_err_msg = custom_err_msg ? custom_err_msg : null
        this.Parent_Error = "UnAuthorisedAccss Error"
    }
}








// exporting 
export {InvalidSessionError,ExpiredSession,UnAuthorisedAccss};