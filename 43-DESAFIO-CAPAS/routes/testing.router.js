import express from "express"
export const testingRouter = express.Router()
import { testController } from "../controller/testing.controller.js"

testingRouter.post("/", testController)

