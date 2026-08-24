import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/authErrors"

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    return res.status(500).json({
        error: err
    });
}
export default errorHandler;