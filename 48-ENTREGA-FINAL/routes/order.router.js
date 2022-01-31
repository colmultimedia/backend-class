import express from "express"
const router = express.Router()
import  OrderController  from "../controller/order.controller.js"


class OrderRouter {

    constructor() {
        this.orderController = new OrderController
    }
    
    start() {
        router.get("/", this.orderController.read)
        return router
    }
}


export default OrderRouter