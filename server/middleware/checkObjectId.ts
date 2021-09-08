// Import mongoose
import mongoose from 'mongoose';

// Interfaces
import { Request, Response, NextFunction } from 'express';

const checkObjectId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (mongoose.isValidObjectId(id)) {
        next();
    } else {
        return res.status(400).json({ msg: "ID isn't valid"})
    }
}

export default checkObjectId;