import express from "express"
const router = express.Router()
import  CartController  from "../controller/cart.controller.js"


class CartRouter {

    constructor() {
        this.cartController = new CartController
    }

    start() {
        router.get("/", this.cartController.read)
        router.post("/add", this.cartController.addCart)
        router.post("/:id", this.cartController.add)
        // router.get("/make-order", this.cartController.make)
        router.delete("/:id", this.cartController.deleteCart)

        return router
    }
}


export default CartRouter