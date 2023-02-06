import { compare, hash } from "bcryptjs";

export class PasswordFactory {

    static async generateHash(text: string): Promise<string> {
        return await hash(text, 8)
    }

    static async compareHash(text: string, hash: string): Promise<boolean> {
        return await compare(text, hash);
    }

}