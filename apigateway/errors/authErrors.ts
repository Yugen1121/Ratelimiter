import { error } from "node:console"

export class AppError extends Error{
    constructor(
        message: string, 
        public statusCode: number){
        super(message)
        
        Error.captureStackTrace(this, this.constructor)
        }
}

export class InvalidCredentialError extends AppError{
    constructor(message: string = "Invalid credentials"){
        super(message, 401)
    }
}