import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

// Types
import { IAuthSliceState } from "../types";

const initialState: IAuthSliceState = {
    user: null,
    isAuthenticated: false,
    error: null,
    token: null,
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
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, setErrors } = authSlice.actions;

export default authSlice.reducer;
