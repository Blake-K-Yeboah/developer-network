import { model, Schema } from "mongoose";

const resetTokenSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default:  Date.now
    }
});

export const ResetToken = model("resetTokens", resetTokenSchema);