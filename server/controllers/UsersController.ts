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
        return res.status(404).json({ msg: "No user with that ID."});
    }

}

// Follow User
const followUser = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Find User
    const user: IUser = await User.findById(req.params.id);

    // If user doesnt exist return error
    if (!user) {
        return res.status(404).json({ msg: "No user with that ID."});
    }

    // If user is following
    if (user.followers.filter(follower => follower.userId === req.user!._id).length > 0) {

        return res.status(400).json({ msg: "You're already following that user."});

    } else {

        const newFollower = {
            userId: req.user!._id,
            date: new Date().toISOString()
        }

        user.followers.push(newFollower);

        try {
            const savedUser = await user.save();
            return res.json(savedUser);
        } catch (err) {
            return res.status(500).json({ msg: "An error occured on the server."});
        }
    }
}

// Unfollow User
const unfollowUser = async (req: AuthRequest, res: Response): Promise<Response> => {

    // Find User
    const user: IUser = await User.findById(req.params.id);

    // If user doesnt exist return error
    if (!user) {
        return res.status(404).json({ msg: "No user with that ID."});
    }

    // If user isn't following
    if (user.followers.filter(follower => follower.userId === req.user!._id).length === 0) {

        return res.status(400).json({ msg: "You're not following that user."});

    } else {

        user.followers = user.followers.filter(follower => follower.userId !== req.user!._id);
        
        try {
            const savedUser = await user.save();
            return res.json(savedUser);
        } catch (err) {
            return res.status(500).json({ msg: "An error occured on the server."});
        }
    }
}

export default {
    getAllUsers,
    getUserById,
    followUser,
    unfollowUser,
}