import mongooes from "mongoose";



// otp schema
const otpSchema =  new mongooes.Schema({
    AUTH_OTP_ID : {
        type:String,
        unique:true,
        required:true
    },
    OTP:{
        type:Number,
        required:true
    },
    LOGIN_ID:{
        type:String,
        required:true
    },
    LOGIN_ID_TYPE:{
        type:String,
        required:true
    }
}, { timestamps: true })


otpSchema.index({createdAt: 1},{expireAfterSeconds: 4800});



// otp model
const otpModel =  new mongooes.model("AUTHOTP",otpSchema);

// exporting default
export default otpModel;