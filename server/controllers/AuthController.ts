//  Express Types
import { Request, Response } from "express";

// Modules
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";

// User Model
import { User } from "../models/user";

// Reset Token Model
import { ResetToken } from "../models/resetToken";

// Generate Token Function
import generateAuthToken from "../config/generateAuthToken";

// USer Interface
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

    // Generate and save token
    const token = uuidv4();

    const newToken = new ResetToken({
        user: user._id,
        token
    });

    const savedToken = await newToken.save();
    
    // Send Email To User With Token
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `You've requested a password reset for Dev Network`,
        html: `<h1>You've requested a password reset</h1><p>Please use the following verification code below to reset your password</p><code>${token}</code>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ msg: "An error occured on the server."})
        }
    });

    return res.send("Success!");
}

export default {
    registerUser,
    login,
    requestPasswordReset
};