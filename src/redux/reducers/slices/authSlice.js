// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      return {
        email: action.payload.email,
        isLogin: action.payload.isLogin,
        accessToken: action.payload.accessToken,
        role: action.payload.role,
      };
    },
    logout(state) {
      return {
        email: "",
        isLogin: false,
        accessToken: "",
        role: "",
      };
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
