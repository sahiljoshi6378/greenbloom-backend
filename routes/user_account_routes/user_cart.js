import express from "express";


// router instance
const router = express.Router();








router.get('/items',(req,res) =>{
    res.status(200).json({
        msg : "OK"
    })
})















// exporting router default
export default router;

