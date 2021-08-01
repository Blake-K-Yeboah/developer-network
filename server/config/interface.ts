import {Request} from "express";

export interface IUser {
    _id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    profilePicture: string,
    bio: string,
    friends: IFriend[],
    createdAt: string
}

export interface IFriend {
    username: string,
    date: string
}

export interface LoginRequest extends Request {
    accountType?: string
}