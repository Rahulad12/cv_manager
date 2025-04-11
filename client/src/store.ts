import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api.ts"
import authReducer from "./slices/authSlices.ts"

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;