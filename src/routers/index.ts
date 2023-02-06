import { Router } from "express";

import AuthRouters from "./AuthUserRouter";
import RegisterRouter from "./RegisterRouter"

const routers = Router()

routers
    .use("/auth", AuthRouters)
    .use("/register", RegisterRouter)

export default routers