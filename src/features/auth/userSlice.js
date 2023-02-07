import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StoreageKeys from "../../constants/LocalKey";

export const register = createAsyncThunk("user/register", async (payload) => {
  const response = await userApi.register(payload);

  localStorage.setItem(StoreageKeys.token, response.jwt);
  localStorage.setItem(StoreageKeys.user, JSON.stringify(response.user));

  return response.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const response = await userApi.login(payload);

  localStorage.setItem(StoreageKeys.token, response.jwt);
  localStorage.setItem(StoreageKeys.user, JSON.stringify(response.user));

  return response.user;
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StoreageKeys.user)) || {},
  },
  reducers: {
    Logout(state, action) {
      localStorage.removeItem(StoreageKeys.token);
      localStorage.removeItem(StoreageKeys.user);
      state.current = {};
    },
  },
  extraReducers: {
    //user/register/fulfilled
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { Logout } = userSlice.actions;

export default userSlice.reducer;
