import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice, authStateChangeSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    // [authStateChangeSlice.name]: authStateChangeSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});