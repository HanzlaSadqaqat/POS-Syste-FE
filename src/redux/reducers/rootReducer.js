import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import appSlice from "./slices/appSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
});

export default rootReducer;
