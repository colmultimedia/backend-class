import express from "express"
const router = express.Router()
import  MessageController  from "../controller/message.controller.js"


class MessageRouter {

    constructor() {
        this.messageController = new MessageController
    }
    
    start() {
        router.post("/", this.messageController.send)
        router.get("/:email", this.messageController.find)
        router.get("/", this.messageController.chat)
        

        return router
    }
}


export default MessageRouter