declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Server Port
            SERVER_PORT: string

            // Database Mongo
            MONGO_CONNECTION: string

            // Configurações do Token JWT
            JWT_SECRET: string
            JWT_REFRESH_SECRET: string
            JWT_EXPIRE: string
            JWT_REFRESH_EXPIRE: string
        }
    }
}
export { }