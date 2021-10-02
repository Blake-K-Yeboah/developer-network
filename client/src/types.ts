export interface IUser {
    _id: string;
    profilePicture: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    createdAt: string;
    followers: [
        {
            userId: string;
            date: string;
        }
    ];
}

export interface IAuthSliceState {
    user: IUser | null;
    isAuthenticated: boolean;
    error: string | null;
    token: string | null;
}
