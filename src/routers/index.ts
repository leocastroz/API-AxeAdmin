import { Router } from "express";

import AuthRouters from "./AuthUserRouter";

const routers = Router()

routers
    .use("/auth", AuthRouters)

export default routers