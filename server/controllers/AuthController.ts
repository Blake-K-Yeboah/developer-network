import { Request, Response } from "express";

// Register User
const registerUser = (req: Request, res: Response): void => {
    // TODO: Register User
    res.send("Register");
}

const AuthController = {
    registerUser
}

export default AuthController;