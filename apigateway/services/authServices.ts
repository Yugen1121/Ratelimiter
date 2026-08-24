import { UserModelInt } from "../database/models/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../database/models/usersModel";
import { InvalidCredentialError } from "../errors/authErrors";
import { IAuthServices } from "./types";

const salt = process.env.JWT_SALT || "123456789";
const bcryptRound = 10
export class AuthServices implements IAuthServices{
    constructor(
        private userModel: UserModelInt
    ){
    }
    async signUp(email: string, password: string, username: string): Promise<void> {
        try{

            const hashedPassword = await bcrypt.hash(password, bcryptRound)
            return await this.userModel.addUser(email, hashedPassword, username)

        }catch(err){
            throw err
        }
    }
    async signIn(email: string, password: string): Promise<string> {
        const user = await this.userModel.findUsingEmail(email);
        if (!user){
            throw new InvalidCredentialError()
        }
        const verify = await bcrypt.compare(password, user.password)
        if (!verify){
            throw new InvalidCredentialError()
        }
        const token = jwt.sign(
            { userId: user.id},
            salt,
            {expiresIn: "7d"}
        )
        return token;   
    }

    validateToken(token: string): number{
        const data = jwt.verify(token, salt) as { userId: number}
        return data.userId
    }
}

const authServices = new AuthServices(userModel);
export default authServices;