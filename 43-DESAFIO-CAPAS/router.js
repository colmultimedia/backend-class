import express from "express";
export const router = express.Router();
import { wrongMsgRoute } from "./config/constants.js"
import { testingRouter } from "./routes/testing.router.js"




// Including Routers

router.use("/test", testingRouter)

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

