import { Request, Response, NextFunction } from "express";
import { ResponseHttpError } from "../errors";

/**
 * Função Middleware para Validação de Roles Permitidas nas Rotas
 * @param roles Role ou Lista de Roles validas para a rota
 * @returns Instancia Middleware Express
 */
export const hasRole = (roles: string | string[]) => {

    return (request: Request, response: Response, next: NextFunction) => {
        if (typeof roles === 'string') roles = [roles]

        const session_roles = request?.session?.roles

        if (!session_roles) throw new ResponseHttpError("Você não tem permissão para acessar essa rota.", 403)

        const validateRoles = session_roles.map(role => roles.includes(role))

        const findValidateRoles = validateRoles.find(item => item === true)

        if (!findValidateRoles) throw new ResponseHttpError("Você não tem permissão para acessar essa rota.", 403)

        next()
    }

}