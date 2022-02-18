class productController{

    // addnew product
    static ADD_PRODUCT = async (req,res) =>{
        const ProductPayload = req.body;
        res.status(200).json({
            msg : ProductPayload
        })
    }

}



// exporting default
export default productController;