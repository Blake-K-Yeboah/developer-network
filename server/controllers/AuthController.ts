//  Express Types
import { Request, Response } from "express";

// Modules
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";
import moment from "moment";

// User Model
import { User } from "../models/user";

// Reset Token Model
import { ResetToken } from "../models/resetToken";

// Generate Token Function
import generateAuthToken from "../config/generateAuthToken";

// Interfaces
import { IUser, IResetToken, AuthRequest } from "../config/interface";

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

    try {

        const savedUser: IUser = newUser.save();

        // Generate and respond with JWT
        const token = generateAuthToken(savedUser);

        return res.json({ token });

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});

    }
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

    try {

        const savedToken = await newToken.save();

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});
        
    }
    
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
        html: `<h1>You've requested a password reset</h1><p>Please use the following verification code below to reset your password (code only valid for 1 hour)</p><code>${token}</code>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ msg: "An error occured on the server."})
        }
    });

    return res.send("Success!");
}

// Reset Password From Code
const resetPasswordFromCode = async (req: Request, res: Response): Promise<Response> => {

    // Check Verification Code exists in database
    const resetToken: IResetToken | null = await ResetToken.findOne({ token: req.body.verifyCode });

    if (!resetToken) {
        return res.status(400).json({ msg: "Invalid verification code provided."});
    }

    // Check verification code matches user
    const user: IUser = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ msg: "No user with that email."});
    }

    if (resetToken.user != user._id) {
        return res.status(400).json({ msg: "Invalid verification code provided."});
    }

    // Check verification code hasnt expired
    const hours = moment().diff(moment(resetToken.createdAt), 'hours', true);

    if (hours > 1) {
        return res.status(400).json({ msg: "Verification code has expired."});
    }

    // Update password in database
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    user.password = hashedPassword;
    
    try {

        const updatedUser = await user.save();
        return res.send("Success!");

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});
        
    }
}

// Reset Password While Logged In
const resetPassword = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Get user from DB
    const user = await User.findById(req.user!._id);

    // Validate password
    const match = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!match) {
        return res.status(400).json({ msg: "Incorrect old password." });
    }

    // Update new password in DB
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    user.password = hashedPassword;

    try {

        const updatedUser = await user.save();
        return res.send("Success!");

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});
        
    }
}

// Update User
const updateUser = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Get user from DB
    const user = await User.findById(req.user!._id);

    // Update bio if exists
    if (req.body.bio) {
        user.bio = req.body.bio;
    }

    // Update name if exists
    if (req.body.name && req.body.name.length > 20) {
        return res.status(400).json({ msg: "Name must be less than 20 characters" })
    } else if (req.body.name) {
        user.name = req.body.name;
    }

    // Update username if exists
    if (req.body.username) {
        user.username = req.body.username;
    }

    try {

        const updatedUser = await user.save();
        
        // Generate and respond with JWT
        const token = generateAuthToken(updatedUser);

        return res.json({ token });

    } catch (err) {

        return res.status(500).json({ msg: "An error occured on the server"});
        
    }
}

export default {
    registerUser,
    login,
    requestPasswordReset,
    resetPasswordFromCode,
    resetPassword,
    updateUser
};