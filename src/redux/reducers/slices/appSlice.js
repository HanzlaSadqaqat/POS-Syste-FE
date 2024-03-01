import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "1",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appData(state, action) {
      return {
        tab: action.payload.tab,
      };
    },
  },
});

export const { appData } = appSlice.actions;
export default appSlice.reducer;
