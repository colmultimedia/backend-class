import express from "express"
const router = express.Router()
import { testController, Anibal } from "../controller/test.controller.js"


export class TestRouter {

    constructor() {
        this.testController = new Anibal
    }
    
    start() {
        router.post("/", testController)
        router.get("/hello", this.testController.tellMe)
        return router
    }
}
