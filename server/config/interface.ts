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

export interface IResetToken {
    _id: string,
    user: string,
    token: string,
    createdAt: string
}