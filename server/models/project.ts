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
        count: {
            type: Number,
            default: 0
        },
        userIds: {
            type: Array,
            default: []
        }
    },
    dislikes: {
        count: {
            type: Number,
            default: 0
        },
        userIds: {
            type: Array,
            default: []
        }
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