/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null as any,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload: user }) => {
      state.currentUser = user;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;