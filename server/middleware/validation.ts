// Types
import { Request, Response, NextFunction } from 'express';

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateRegisterInput = async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, password, email, bio } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "Please enter a name."});
    } else if (name.length > 20) {
        return res.status(400).json({ msg: "Your name can only be 20 characters long."});
    }

    if (!username) {
        return res.status(400).json({ msg: "Please enter a username."});
    }

    if (!password) {
        return res.status(400).json({ msg: "Please enter a password."});
    } else if (password.length < 8) {
        return res.status(400).json({ msg: "Password must be 8 characters or longer."});
    }

    if (!email) {
        return res.status(400).json({ msg: "Please enter an email."});
    } else if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Email is invalid"});
    }

    if (!bio) {
        return res.status(400).json({ msg: "Please enter a bio."});
    }

    next();
}

export const validateLoginInput = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Please enter your email."});
    } else if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Email is invalid"});
    }

    if (!password) {
        return res.status(400).json({ msg: "Please enter your password."});
    }

    next();
}

export const validateResetPasswordFromCodeInput = async (req: Request, res: Response, next: NextFunction) => {
    const { verifyCode, newPassword, confirmNewPassword } = req.body;

    if (!verifyCode) {
        return res.status(400).json({ msg: "Please enter a verification code."});
    }

    if (!newPassword) {
        return res.status(400).json({ msg: "Please enter a new password."});
    } else if (newPassword.length < 8) {
        return res.status(400).json({ msg: "Password must be 8 characters or longer."});
    }

    if (!confirmNewPassword) {
        return res.status(400).json({ msg: "Please re enter your password."});
    } else if (confirmNewPassword !== newPassword) {
        return res.status(400).json({ msg: "Passwords dont match."});
    }

    next();
}