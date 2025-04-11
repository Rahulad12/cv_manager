import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "../types";

interface userResponse {
    user: user;
    success: boolean;
    message: string;
}

const token = localStorage.getItem("token") ? localStorage.getItem("token") : ""
const username = localStorage.getItem("username") ? localStorage.getItem("username") : ""
const email = localStorage.getItem("email") ? localStorage.getItem("email") : ""

const initialState: userResponse = {
    user: {
        username: username || "",
        email: email || "",
        token: token || ""
    },
    success: false,
    message: ""
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<userResponse>) => {
            state.user = action.payload.user;
            state.success = action.payload.success;
            state.message = action.payload.message

            const { username, email, token } = action.payload.user;

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);

        },
        logout: (state) => {
            state.user = {
                username: "",
                email: "",
                token: ""
            };
            state.success = false;
            state.message = ""
            localStorage.removeItem("token");
        }
    }
});

export const { setCredentials, logout } = auth.actions;

export default auth.reducer;
