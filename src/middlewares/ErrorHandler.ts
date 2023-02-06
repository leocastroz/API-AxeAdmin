import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { ResponseHttpError } from "../errors";

export const resolver = (callback: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise
            .resolve(callback(req, res, next))
            .catch(e => next(e))
    }
}

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error)

    if (error instanceof ResponseHttpError)
        return response.status(error.statusCode).json({ error: error.message })

    if (error instanceof MongoServerError)
        return response.status(500).json({ error: `Internal mongodb service error. Code: ${error.code}` })

    return response.status(500).json({ error: 'Internal server error', type: error.name })
}