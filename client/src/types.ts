// User Interface
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

// Auth Slice Initial State Interface
export interface IAuthSliceState {
    user: IUser | null;
    isAuthenticated: boolean;
    token: string | null;
    signUpInput: {
        name: string;
        email: string;
    };
}

// Theme Interface
export interface ITheme {
    colors: {
        lightGray: string;
        primaryBlue: string;
        primaryRed: string;
        fadedWhite: string;
        fadedGray: string;
        primaryDarkerBlue: string;
        primaryDarkerRed: string;
    };
}
