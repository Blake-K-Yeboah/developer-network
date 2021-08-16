//  Express Types
import { Response } from "express";

// Interfaces
import { AuthRequest, IUser } from "../config/interface";

// User Model
import { User } from "../models/user";

// Get all users
const getAllUsers = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Fetch all users from db
    const users: IUser[] = await User.find({});

    // Return all users
    return res.json({
        count: users.length,
        results: users.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1)
    });
}

// Get user by id
const getUserById = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Find User
    const user: IUser = await User.findById(req.params.id);

    // Check if user exists
    if (user) {
        return res.json(user);
    } else {
        return res.status(400).json({ msg: "No user with that ID."});
    }

}

export default {
    getAllUsers,
    getUserById
}