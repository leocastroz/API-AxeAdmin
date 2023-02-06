import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ResponseHttpError } from "../errors";
import { jwtFactory } from "../helpers/JwtFactory";

export const validateSession = (request: Request, response: Response, next: NextFunction) => {

    const { authorization } = request.headers

    if (!authorization) throw new ResponseHttpError("Autorização não informada.", 401)

    const [_, token] = authorization.split(" ")

    if (!token) throw new ResponseHttpError("Autorização mal formatada.", 401)

    const { decode, error } = jwtFactory.verify(token)

    if (error instanceof TokenExpiredError) throw new ResponseHttpError("Token expirado, efetue novamente o login.", 401)
    if (error instanceof JsonWebTokenError) throw new ResponseHttpError("Token invalido.", 401)

    request.session = {
        user_id: decode.sub,
        roles: decode["roles"]
    }

    next()
}