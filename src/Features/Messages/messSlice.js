import {  createSlice } from "@reduxjs/toolkit";

const messSlice = createSlice({
  name: "mess",
  initialState: {
    online: "",
    ofline: ""
  },
  reducers: {
    Online(state, action) {
      try {
        state.online = action.payload.activity;
      } catch (error) {
        console.log(error);
      }
    },

  },
});

const { actions, reducer } = messSlice;
export const { Online, Calluser } = actions;
export default reducer; //default export
