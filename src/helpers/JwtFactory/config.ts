export interface ConfigJwt {
    secret?: string,
    refresh_secret?: string,
    expire?: number,
    refresh_expire?: number
}

export const config: ConfigJwt = {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expire: parseInt(process.env.JWT_EXPIRE),
    refresh_expire: parseInt(process.env.JWT_REFRESH_EXPIRE)
}
