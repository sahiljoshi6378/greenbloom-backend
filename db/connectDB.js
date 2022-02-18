import mongooes from "mongoose";
import { DB_CONNECTION_FALIAR } from "../errors/serverlevelerros.js";


// db uri
// const DB_URI ="mongodb+srv://greenbloom6378:FyJUaSRznauFA6Fm@cluster0.k3omh.mongodb.net/greenbloom?retryWrites=true&w=majority";
const DB_URI ="mongodb://0.0.0.0:27017/greenbloom"

// connectDB function
const connectDB = async () =>{
    try {
        const db_response  =  await mongooes.connect(DB_URI);
        console.log(`DB connection success`);
    } catch (error) {
        const db_error = new DB_CONNECTION_FALIAR("cannot connect to DB.",400,error);
        console.log(`msg : ${db_error.ERR_MSG} \ncode : ${db_error.ERR_CODE}  \nref_code : ${db_error.ERR_REF} `);
    }
}

// exporting default
export default connectDB;


