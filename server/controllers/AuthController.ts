//  Express Types
import { Request, Response } from "express";

// Modules
import bcrypt from "bcryptjs";

// User Model
import { User } from "../models/user";

// Generate Token Function
import generateAuthToken from "../config/generateAuthToken";

// Register User
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    
    // Check if email already in use
    const userByEmail = await User.findOne({ email: req.body.email });

    if (userByEmail) {
        return res.status(400).json({ msg: "Email already used." });
    }

    // Check if username already in use
    const userByUsername = await User.findOne({ username: req.body.username });

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

    const savedUser = newUser.save();

    // Generate and respond with JWT
    const token = generateAuthToken(savedUser);

    return res.json({ token });
}

// Login
const login = async (req: Request, res: Response): Promise<Response> => {
    return res.json({});
}

export default {
    registerUser,
    login
};