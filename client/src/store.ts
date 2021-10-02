import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./slices/authSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
