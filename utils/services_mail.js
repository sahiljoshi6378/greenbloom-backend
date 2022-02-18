import twilio from "twilio";
import  hbs from 'nodemailer-express-handlebars'
import  nodemailer from 'nodemailer';
import path from 'path';

// twilio config
const accountSSID =   "ACbde37c979e8e555065876c2fe59e0fb1";
const authToken =  "83de34bd7b0a0ef7bd454ca28e6a6503";
const fromMobileNumber = "+19106138562"; 
const TWILLIO_CLIENT = new twilio(accountSSID,authToken);





// transporter instance for email otp service
const MAIL_TRANSPORTER = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth :{
        user : "greenbloomecommerce@gmail.com",
        pass : "9Green@9Bloom"
    }
})



// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('/home/sahil/Documents/projects/copy/server/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('/home/sahil/Documents/projects/copy/server/views/'),
};

// use a template file with nodemailer
MAIL_TRANSPORTER.use('compile', hbs(handlebarOptions))











const SEND_MAIL =  (RECEIVER_MAIL,SUBJECT,CONTEXT) =>{
    // OTP SERVICE MAIL OPTIONS
    const MAIL_OPTIONS = {
        from :  "greenbloomecommerce@gmail.com",
        to : RECEIVER_MAIL,
        subject: SUBJECT,
        template: 'email', 
        context:CONTEXT
    }
   
     // sending email to the user
     return MAIL_TRANSPORTER.sendMail(MAIL_OPTIONS);
}



const  SEND_MOBILE_SMS = async (SMS_BODY,to_Mobile) =>{
    try {
       const client_res = await TWILLIO_CLIENT.messages.create({
            body: SMS_BODY,
            from: fromMobileNumber,
            to: `+91${to_Mobile}`
        });

        return {
            sid : client_res.sid
        }

    } catch (error) {
        throw new Error();
    }
}








export {SEND_MOBILE_SMS,SEND_MAIL};



