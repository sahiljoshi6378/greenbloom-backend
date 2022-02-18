import Joi from "joi";

class productMiddleware{

    // Input Validation to Add product
    static ADD_PRODUCT_VALIDATION = (req,res,next) =>{
        const ProductPayload = req.body;
        

        // Product_schema_validation
        const schems = Joi.object({
            
        })




        next();
    }
}



// exporting default
export default productMiddleware;