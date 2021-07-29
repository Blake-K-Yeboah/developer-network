// JWT package
import jwt from "jsonwebtoken";

// Interfaces
import { IUser } from "../config/interface";

export default (user: IUser): string => {
    const secret = process.env.JWT_SECRET;

    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            friends: user.friends,
            createdAt: user.createdAt
        },
        secret!,
        { expiresIn: "1h" }
    );
}