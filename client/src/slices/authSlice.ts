import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const authSlice: any = createSlice({
    name: "auth",
    initialState: {
      user: null,
      isAuthenticated: false,
      errors: null,
      token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload ? jwt_decode(action.payload) : null;
            state.isAuthenticated = action.payload ? true : false;
            state.token = action.payload || null;
         },
         setErrors: (state, action) => {
            state.errors = action.payload;
         },
    }
});

export const { setUser, setErrors } = authSlice.actions;

export default authSlice.reducer;