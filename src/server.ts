import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares";
import routers from "./routers";
import "./database"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routers)
app.use(errorHandler)

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, () => {
    console.info(`Servidor rodando na porta ${PORT}`)
})