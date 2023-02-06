interface Session {
    user_id: number,
    roles: string[]
}

declare namespace Express {
    interface Request {
        session: Session | undefined
    }
}