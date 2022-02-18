// InternalServerError
class InternalServerError{

    // ERR constructor
    constructor(ERR_MSG="Internal Server ERROR!",ERR_CODE=500,error){
        this.ERR_MSG =  ERR_MSG ? ERR_MSG : "Error while starting the server",
        this.ERR_CODE = ERR_CODE ? ERR_CODE : 500,
        this.ERR_REF = error ? error : null  
    }


    // static method for format error massage
    static  format_err() {
        return `${this.ERR_MSG} : ${this.ERR_CODE}`
    }
}




// DB_CONNECTION_FALIAR
class DB_CONNECTION_FALIAR{
    // ERR constructor
    constructor(ERR_MSG="Cannot connect to DB",ERR_CODE=400,error=null){
        this.ERR_MSG =  ERR_MSG ? ERR_MSG : "Error while connecting to databses!!!",
        this.ERR_CODE = ERR_CODE ? ERR_CODE : 400,
        this.ERR_REF = error ? error : null  
    }


    // static method for format error massage
    static  format_err() {
        return `${this.ERR_MSG} : ${this.ERR_CODE}`
    }
}


export {InternalServerError,DB_CONNECTION_FALIAR} 