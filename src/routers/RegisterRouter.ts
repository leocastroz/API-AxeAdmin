import { Router } from "express"
import { resolver } from "../middlewares"
import { RegisterController } from "../controllers/RegisterController"

const router = Router()

const registerController = new RegisterController()

router
    .get("/", resolver(registerController.get))
    .post("/", resolver(registerController.register))

export default router