import { Router, Request, Response } from "express";
import errorHandler from "../middleware/authMiddleware";
import authController from "../controller/authController";

const authRouter = Router()

authRouter.post("/login", authController.signIn)
authRouter.post("/register", authController.register)

authRouter.use(errorHandler)

export default authRouter;