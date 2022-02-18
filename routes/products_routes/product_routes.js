import express from "express";


// router instance
const router = express.Router();


// importing middlewares and controllers
import productMiddleware from "../../middlewares/products_mdware/products_mdware.js";
import productController from "../../controllers/products_cntlr/products_cntrls.js";
import userAccountMiddleware from "../../middlewares/user_acc_middleware/user_acc_middleware.js";
import Common_Utilis from "../../utils/utils_mware_crlrs.js";







// GET ROUTES
// to get single product
// to get products from a sub-category
// to get all the all the categoties
router.get('/',(req,res) =>{
    res.status(200).json({
        products : "all products."
    })
})




// POST routes
// to add new product 
router.post('/create_product',
userAccountMiddleware.USER_SESSION_VALIDATOR,
Common_Utilis.ADMIN_ONLY_ACCESS,
productMiddleware.ADD_PRODUCT_VALIDATION,
productController.ADD_PRODUCT)


// PATCH routes
// to edit or update a single product details.



// DELETE router
// to Delete a single product.













// exporting default
export default router