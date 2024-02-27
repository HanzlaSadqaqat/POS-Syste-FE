// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    email: '',
    accessToken: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            return {
                ...state,
                email: action.payload.email,
                isLogin: action.payload.isLogin,
                accessToken: action.payload.accessToken
            };
        },
        logout(state) {
            return {
                ...state,
                email: '',
                isLogin: false,
                accessToken: ''
            };
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
