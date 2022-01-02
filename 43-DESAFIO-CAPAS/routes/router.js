import express from "express";
export const router = express.Router();
import { wrongMsgRoute } from "../config/constants.js"
import  ProductRouter  from "./product.router.js";
import { TestRouter } from "./test.router.js"


// Including Routers

const productRouter = new ProductRouter
const testRouter = new TestRouter

router.use("/product", productRouter.start())
router.use("/test", testRouter.start())

// testing routes
router.get("/", (req, res) => {
    res.json("Hello there")
})


// Wrong routes
router.get("**",(req,res)=>{
    res.status(200).json(wrongMsgRoute)
})
router.post("**",(req,res)=>{
    res.status(200).json(wrongMsgRoute)
})
router.delete("**",(req,res)=>{
    res.status(200).json(wrongMsgRoute)
})

