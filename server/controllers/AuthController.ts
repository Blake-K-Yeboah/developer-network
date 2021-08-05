//  Express Types
import { Request, Response } from "express";

// Modules
import bcrypt from "bcryptjs";

// User Model
import { User } from "../models/user";

// Generate Token Function
import generateAuthToken from "../config/generateAuthToken";
import { IUser } from "../config/interface";

// Register User
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    
    // Check if email already in use
    const userByEmail: IUser | null = await User.findOne({ email: req.body.email });

    if (userByEmail) {
        return res.status(400).json({ msg: "Email already used." });
    }

    // Check if username already in use
    const userByUsername: IUser | null = await User.findOne({ username: req.body.username });

    if (userByUsername) {
        return res.status(400).json({ msg: "Username already used." });
    }

    // Hash password for safe storage
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create and save new user
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        bio: req.body.bio
    });

    const savedUser: IUser = newUser.save();

    // Generate and respond with JWT
    const token = generateAuthToken(savedUser);

    return res.json({ token });
}

// Login
const login = async (req: Request, res: Response): Promise<Response> => {

    // Check if account with email exists
    const user: IUser | null = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ msg: "No user with that email." });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
        return res.status(400).json({ msg: "Incorrect Password "});
    }
    
    // Generate and respond with JWT
    const token = generateAuthToken(user);

    return res.json({ token });
}

// Request Password Reset
const requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
   
    // Check if account with email exists
    const user: IUser | null = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ msg: "No user with that email." });
    }

    
    return res.json({ });
}

export default {
    registerUser,
    login,
    requestPasswordReset
};