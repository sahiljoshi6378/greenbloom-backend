// Basic imports required for server.
import express from "express";
// import https from "https";
import http from "http";
import crypto from "crypto"
import Common_Utilis from "./utils/utils_mware_crlrs.js";

// other module imports
import { readFileSync } from "fs";
import {InternalServerError} from "./errors/serverlevelerros.js";


// Middlewares for parsing response object 
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({path : './config.env'});



// Middle ware for security and debug
import helmet from "helmet";
import morgan from "morgan";




// importing routes
// authentication router
import connectDB from "./db/connectDB.js";
import authencation from "./routes/authroutes/authencation.js";



// user account routes
import userAccountRouter from "./routes/user_account_routes/user_account_info.js";
import userCartRouter from "./routes/user_account_routes/user_cart.js";
// import userWishlistRouter from "./routes/user_account_routes/user_wishlist.js";
// import userReviewsRouter from "./routes/user_account_routes/user_reviews.js";
// import userNotificationRouter from "./routes/user_account_routes/user_notifications.js";


import productRouter from "./routes/products_routes/product_routes.js";


connectDB();





// --------------------CREATING AND BASIC INIT OF SERVER==[START]----------------------------
// const https SERVER_OPTIONS;
const SERVER_OPTIONS = {
    SSL_CERT : readFileSync("./cert/localhost/localhost.cert"),
    SSL_KEY  : readFileSync("./cert/localhost/localhost.decrypted.key") 
}


// express app instance
const app = express();

// Server instance
// const HTTPs_SERVER = https.createServer(app)
const HTTPs_SERVER = http.createServer(app);
// --------------------CREATING AND BASIC INIT OF SERVER==[END]----------------------------










// Application lever Init.
app.set('PORT',process.env.PORT || 5000);
app.set('HOST',process.env.HOST || "localhost");
const WHITE_LISTED_ORIGINS = ['http://localhost:5000'];
const CORS_OPTIONS = {
    "origin" : "'https://localhost:5080",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}






// Activating middlewares
// app.use(cors(CORS_OPTIONS));
app.use(helmet());
app.use(morgan("tiny"));
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());









app.get('/',(req,res) =>{
    res.status(200).json({
        msg : Common_Utilis.generatePID()
    })
})


// Authencation route
app.use('/api/v1/auth',authencation);



// USER ACCOUNT RELATED ROUTES
// user account route
app.use('/api/v1/user/account',userAccountRouter);
// user cart route
app.use('/api/v1/user/cart',userCartRouter);
// // user wishlist route
// app.use('/api/v1/user/wishlist',userWishlistRouter);
// // user account reviews route 
// app.use('/api/v1/user/reviews/',userReviewsRouter);
// // user account notifications route
// app.use('/api/v1/user/notifications',userNotificationRouter);






// Product related 
app.use('/api/v1/product',productRouter)













// Starting server
HTTPs_SERVER.listen(app.get('PORT'),app.get("HOST"),(error) =>{
    try {

         // handling exreption
         if(error) {
            throw new InternalServerError("Internal server ERROR!",500,error);
        }


        // logging to console
        console.log(`SERVER runngin at : https://${app.get("HOST")}:${app.get("PORT")}`);

    } catch (error) {
        if(error instanceof InternalServerError){
            console.log("ERROR FOUND!")
            console.log(`ERR_MSG : ${error.ERR_MSG}`)
            console.log(`ERR_CODE : ${error.ERR_CODE}`)
        }else{
            console.log("UNKNOWN ERROR FOUND!")
            console.log(`ERR_MSG : ${error.ERR_MSG}`)
            console.log(`ERR_CODE : ${error.ERR_CODE}`)
        }
        
    }
})

