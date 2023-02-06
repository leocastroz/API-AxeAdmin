import { Router } from "express"
import { resolver } from "../middlewares"
import { AuthController } from "../controllers/AuthController"

const router = Router()

const authController = new AuthController()

router
    .get("/", resolver(authController.get))
    .post("/", resolver(authController.auth))
    .post("/refresh", resolver(authController.refresh))

export default router