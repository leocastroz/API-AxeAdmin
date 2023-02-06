import { sign, verify } from "jsonwebtoken";
import { config, ConfigJwt } from "./config";
import { IUser } from "../../models/User";


export class JwtFactory {

    constructor(private config: ConfigJwt) {
        this.config = config
    }

    create(user: IUser, isRefrsh: boolean = false) {
        return sign({
            roles: user.roles,
        }, isRefrsh ? this.config.refresh_secret : this.config.secret, {
            subject: String(user.id),
            expiresIn: isRefrsh ? this.config.refresh_expire : this.config.expire
        });
    }

    verify(token: string, isRefrsh: boolean = false) {
        try {
            const decode = verify(token, isRefrsh ? this.config.refresh_secret : this.config.secret);
            return { decode, error: undefined }
        } catch (error) {
            return { decode: undefined, error }
        }
    }

}

export const jwtFactory = new JwtFactory(config)
