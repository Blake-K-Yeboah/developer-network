import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: false,
        default: 'default.jpg'
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    friends: [{
        username: String,
        date: { type: Date, default: Date.now }
    }],
    createdAt: {
       type: Date,
       default: Date.now,
    },
});

export const user = model("users", userSchema);