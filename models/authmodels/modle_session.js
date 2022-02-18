import mongooes from "mongoose";



// session schema
const sessionSchema = new mongooes.Schema({
    session_token :{
        type:String,
        required:true
    },
    ACCOUNT_UID :{
        type:String,
        required:true
    },
    roal:{
        type:String,
        default:false,
        required:true
    },
    isAdmin:{
        type:String,
        default:false,
        required:true
    }
}, { timestamps: true })









// adding TTL
sessionSchema.index({createdAt: 1},{expireAfterSeconds: 2592000});



// scssion model
const SessModel = new mongooes.model('SESSION',sessionSchema);


// exporting default
export {SessModel}