import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../../../api/userApi";
import storageKeys from "../../../constants/storage-keys";
export const signup = createAsyncThunk("user/signup", async (payload) => {
  //call Api to signup
  const data = await userApi.signup(payload);
  return data.data.userId;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  //call Api to signup
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.data.token);
  localStorage.setItem(storageKeys.REFRESH_TOKEN, data.data.refreshToken);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.data.userId));

  return data.data.userId;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
  },
  reducers: {
    logout(state) {
      try {
        state.current = {};
        userApi
          .status({ status: false })
          .then((result) => {
            localStorage.removeItem(storageKeys.USER);
            localStorage.removeItem(storageKeys.TOKEN);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    },
  },
  // khin cai thunk thanh cong thi ca[p nhat vao redux
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.current = action.payload;
      //return tren thunk return tra ve gi thi o day nhan dc vay
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
      //return tren thunk return tra ve gi thi o day nhan dc vay
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; //default export
