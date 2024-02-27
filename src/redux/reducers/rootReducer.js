import { combineReducers } from "redux"
import { loginSuccess, logout } from "./slices/authSlice"

const rootReducer = combineReducers({
    loginSuccess: loginSuccess,
    logout: logout
})

export default rootReducer

