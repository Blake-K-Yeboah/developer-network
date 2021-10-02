import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./slices/authSlice";

// Types
import { IAuthSliceState } from "./types";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export interface RootState {
    auth: IAuthSliceState;
}

export default store;
