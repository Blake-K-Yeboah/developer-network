import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

// Types
import { IAuthSliceState } from "../types";

const initialState: IAuthSliceState = {
    user: null,
    isAuthenticated: false,
    token: null,
    signUpInput: {
        name: "",
        email: "",
    },
};

export const authSlice: any = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload ? jwt_decode(action.payload) : null;
            state.isAuthenticated = action.payload ? true : false;
            state.token = action.payload || null;
        },
        setSignUpInput: (state, action) => {
            state.signUpInput = action.payload;
        },
    },
});

export const { setUser, setSignUpInput } = authSlice.actions;

export default authSlice.reducer;
