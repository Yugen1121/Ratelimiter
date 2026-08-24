import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/authErrors";
import { asyncHandler } from "../middleware/asyncMiddlerware";
import { IAuthServices } from "../services/types";
import authServices from "../services/authServices";


export class AuthController {
    constructor(
        private authServices: IAuthServices
    ){

    }
    signIn = asyncHandler(
        async (req: Request, res: Response, next: NextFunction)=>{
            const { email, password } = req.body 
            if (!email || !password){
                return res.status(401).json({
                    "error": "Invalid credential"
                })
            }
            const token = await this.authServices.signIn(email, password)
            return res.status(200).json(
                {
                    message: "Login successful",
                    "authToken": token
                }
            )
        }
    )

    register = asyncHandler(
        async(req: Request, res: Response, next: NextFunction)=>{
            const  { email, password, username } = req.body;
            await this.authServices.signUp(email, password, username)
            return res.status(201).json({
                message: "User registered"
            })
        }
    )
}

export default new AuthController(authServices);