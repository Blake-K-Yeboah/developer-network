import { Document } from 'mongoose'
import { Request } from 'express'

export interface IUser extends Document {
    _id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    profilePicture: string,
    bio: string,
    followers: IFollower[],
    createdAt: string
}

export interface IFollower {
    _id?: string
    userId: string,
    date: string
}

export interface IResetToken extends Document  {
    _id: string,
    user: string,
    token: string,
    createdAt: string
}

export interface AuthRequest extends Request {
    user?: IUser
}

export interface IProject extends Document {
    _id: string,
    name: string,
    description: string,
    image: string,
    likes: {
        count: number,
        userIds: string[]
    },
    dislikes: {
        count: number,
        userIds: string[]
    },
    createdAt: string,
    user: string
}