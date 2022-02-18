class EmptyInput{
    constructor(){
        this.ERR_MSG =  "Invalid inputs",
        this.ERR_DESC = "Empty inputs are not allowed.",
        this.ERR_CODE = 404,
        this.SUCCESS = false,
        this.Parent_Error = "EmptyInputError"
    }
}





class ValidatioError{
    constructor(){
        this.ERR_MSG =  "Validation failed",
        this.ERR_DESC = "Validation failed due to invalid inputes.",
        this.ERR_CODE = 404,
        this.SUCCESS = false,
        this.Parent_Error = "ValidationError"
    }
}






class UserAlreadyExist{
    constructor(){
        this.ERR_MSG =  "User already Exist",
        this.ERR_DESC = "it seems you are already registred with us, try login."
        this.ERR_CODE = 404,
        this.SUCCESS = false,
        this.Parent_Error = "UserAlreadyExistError"
      
    }
}


class RegistrationError{
    constructor(){
        this.ERR_MSG  =  "Registration Failed.",
        this.ERR_DESC =  "An Error occurred while registring new user."
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "RegistrationError"
    }
}

class CustomValidationError{
    constructor(err_type_code=null,custom_err_msg=null){
        this.ERR_TYPE_CODE = err_type_code,
        this.CUSTOM_ERR_MSG = custom_err_msg
        this.Parent_Error = "Custom_Validation_Error"
    }
}


class SessionGenerationError{
    constructor(){
        this.ERR_MSG  =  "Login failed via otp.",
        this.ERR_DESC =  "An Error occurred while generating new session."
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "SessionGenerationError"
    }
}



class OtpNotSent{
    constructor(){
        this.ERR_MSG  =  "OTP SENDING FALIAR",
        this.ERR_DESC =  "Cannot send otp to the given phone/email."
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "OtpNotSentError"
    }
}





class OtpGenerationError{
    constructor(){
        this.ERR_MSG  =  "OTP Generation Error",
        this.ERR_DESC =  "Error while Genenration new OTP Token"
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "OtpGenerationErrorError"
    }
}



class JwtGenerationError{
    constructor(){
        this.ERR_MSG  =  "JwtToken Generation Error",
        this.ERR_DESC =  "Error while Genenration new Jwt Token"
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "JwtGenerationErrorError"
    }
}





class InvalidOtpError{
    constructor(){
        this.ERR_MSG  =  "Invalid OTP",
        this.ERR_DESC =  "Login failed due to Invalid OTP provided"
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "InvalidOtpErrorError"
    }
}





class UserNotFound{
    constructor(){
        this.ERR_MSG  =  "BAD REQUEST",
        this.ERR_DESC =  "Invalid loginID or Password!"
        this.ERR_CODE =  404,
        this.SUCCESS = false,
        this.Parent_Error = "UserNotFoundError"
    }
}







// xpotring errors
export {
    EmptyInput,
    ValidatioError,
    UserAlreadyExist,
    RegistrationError,
    UserNotFound,
    OtpNotSent,
    OtpGenerationError,
    JwtGenerationError,
    InvalidOtpError,
    CustomValidationError,
    SessionGenerationError
};