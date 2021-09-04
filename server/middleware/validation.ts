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
    const { verifyCode, newPassword, confirmNewPassword, email } = req.body;

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

    if (!email) {
        return res.status(400).json({ msg: "Please enter your email."});
    }

    next();
}

export const validateResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword, confirmNewPassword, oldPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ msg: "Please enter a new password."});
    } else if (newPassword.length < 8) {
        return res.status(400).json({ msg: "Password must be 8 characters or longer."});
    }

    if (!confirmNewPassword) {
        return res.status(400).json({ msg: "Please re enter your new password."});
    } else if (confirmNewPassword !== newPassword) {
        return res.status(400).json({ msg: "Passwords dont match."});
    }

    if (!oldPassword) {
        return res.status(400).json({ msg: "Please enter your old password."});
    }

    next();
}

export const validateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
    const { profilePic }: any = req.files!;

    if (!profilePic) {
        return res.status(400).json({ msg: "Please upload a profile picture."});
    }

    const fileType: string = profilePic.name.split('.')[1];
    const allowedTypes: string[] = ["png", "jpg", "jpeg"];

    if (!allowedTypes.includes(fileType)) {
        return res.status(400).json({ msg: "File must be a png or jpg image."});
    }

    if (profilePic.size > 8e+6) {
        return res.status(400).json({ msg: "Image is too large. 8 MB limit"})
    }

    next();
}

export const validateProjectInput = async (req: Request, res: Response, next: NextFunction) => {
    const { image }: any = req.files!; 
    const { name, description }: any = req.body;

    
    if (!name) {
        return res.status(400).json({ msg: "Please enter a name for your project."});
    } else if (name.length > 25) {
        return res.status(400).json({ msg: "Project's name can only be 25 characters long."});
    }

    if (!description) {
        return res.status(400).json({ msg: "Please enter a description for your project."});
    } else if (description.length > 100) {
        return res.status(400).json({ msg: "Project's description can only be 100 characters long."});
    }

    if (!image) {
        return res.status(400).json({ msg: "Please upload an image."});
    }

    const fileType: string = image.name.split('.')[1];
    const allowedTypes: string[] = ["png", "jpg", "jpeg"];

    if (!allowedTypes.includes(fileType)) {
        return res.status(400).json({ msg: "File must be a png or jpg image."});
    }

    if (image.size > 8e+6) {
        return res.status(400).json({ msg: "Image is too large. 8 MB limit"})
    }
    
    next();
}