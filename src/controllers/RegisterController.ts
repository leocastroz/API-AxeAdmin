import { Request, Response } from "express";
import { ResponseHttpError } from "../errors";
import User from "../models/User";

export class RegisterController {

    async get(req: Request, res: Response) {
        return res.json({ message: "Rota de registro de novos usuários." })
    }

    async register(req: Request, res: Response) {
        const { name, email, username, password } = req.body;

        if (!name || !email || !username || !password) throw new ResponseHttpError("Campos necessarios não informados.", 400)

        const newUser = new User({
            name: name,
            email: email,
            username: username.toLowerCase(),
            password: password
        })

        const createUser = await User.create(newUser)

        return res.json({ message: "Usuário criando com sucesso.", user: createUser.id })
    }

}