import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        count: Number,
        userIds: Array
    },
    dislikes: {
        count: Number,
        userIds: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
});

export const Project = model("projects", projectSchema);