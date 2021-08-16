//  Express Types
import { Request, Response } from "express";

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

export default {
    getAllUsers
}