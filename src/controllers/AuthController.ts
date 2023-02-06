import { Request, Response } from "express";
import { ResponseHttpError } from "../errors";
import User from "../models/User";
import { PasswordFactory } from "../helpers/PasswordFactory";
import { jwtFactory } from "../helpers/JwtFactory";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export class AuthController {

    async get(req: Request, res: Response) {

        return res.json({ message: "Rota de Autenticação, vamos aprender a utilizar o capeta do Axios." })
    }

    async auth(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) throw new ResponseHttpError("Usuario e/ou Senha não informados.", 401)

        const found_user = await User.findOne({ username: username })
        if (!found_user) throw new ResponseHttpError("Usuario e/ou Senha Invalidos.", 401)

        const isValidPassword = await PasswordFactory.compareHash(password, found_user.password)
        if (!isValidPassword) throw new ResponseHttpError("Usuario e/ou Senha Invalidos.", 401)

        const token = jwtFactory.create(found_user)
        const refresh = jwtFactory.create(found_user, true)

        return res.json({ message: "Usuario autenticado com sucesso.", token, refresh })
    }

    async refresh(req: Request, res: Response) {
        const { refresh_token } = req.body

        if (!refresh_token) throw new ResponseHttpError("Refresh Token não informado.", 401)

        const { decode, error } = jwtFactory.verify(refresh_token, true)

        if (error instanceof TokenExpiredError) throw new ResponseHttpError("Refresh Token expirado, efetue novamente o login.", 401)
        if (error instanceof JsonWebTokenError) throw new ResponseHttpError("Refresh Token invalido.", 401)

        const found_user = await User.findById(decode.sub)
        if (!found_user) throw new ResponseHttpError("Refresh Token com usuario invalido.", 401)

        const token = jwtFactory.create(found_user)
        const refresh = jwtFactory.create(found_user, true)

        return res.json({ message: "Token atualizado com sucesso.", token, refresh })
    }

}