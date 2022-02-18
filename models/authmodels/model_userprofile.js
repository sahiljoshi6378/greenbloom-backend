import mongoose from "mongoose";
import bcrypt from "bcrypt"




const userSchema =  new mongoose.Schema({
    UID:{
        type:String,
        required:true
    },
    isBlockedlisted:{
        type:Boolean,
        default:false
    },
    isDeactivated:{
        type:Boolean,
        default:false
    },
    twofauth:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    roal:{
        type:String,
        default:"user",
        require:true
    },
    acc_created :{
      type:Date,
      default: () => Date.now()  
    },

    last_updated :{
        type :Date,
        default: () => Date.now()
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        default:null
    },
    last_name:{
        type:String,
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    user_db_references :{
        ADDRESS_BOOK_ID : {
            type:String,
            default:null
        },
        NOTIFICATION_BUCKET_ID:{
            type:String,
            default:null
        },
        WISH_BUCKET_ID:{
            type:String,
            default:null
        },
        CART_BUCKET_ID:{
            type:String,
            default:null
        },
        ORDERS_BUCKET_ID:{
            type:String,
            default:null
        },
        PAY_METHODS_BUCKET_ID:{
            type:String,
            default:null
        }
        
    }
})




// preloader
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next()
})






// USER_PROFILE model instance
const UserModel = new mongoose.model('USER',userSchema);

// default exporting
export default UserModel
