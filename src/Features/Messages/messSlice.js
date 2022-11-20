import {  createSlice } from "@reduxjs/toolkit";

const messSlice = createSlice({
  name: "mess",
  initialState: {
    online: "",
    ofline: "",
    userId2: "",
  },
  reducers: {
    Online(state, action) {
      try {
        state.online = action.payload.activity;
      } catch (error) {
        console.log(error);
      }
    },
    // setUserId2(state, action) {
    //   try {
    //     state.userId2 = action.payload.id;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
});

const { actions, reducer } = messSlice;
export const { Online } = actions;
export default reducer; //default export
