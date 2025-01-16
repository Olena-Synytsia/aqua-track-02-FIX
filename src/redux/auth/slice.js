import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  login,
  logout,
  refreshToken,
  register,
  updateUser,
} from "./operations.js";

const initialState = {
  userInfo: "",
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn: false,
  isRegistered: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken); // Зберігаємо токен в localStorage
    },
    clearError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.userInfo = "";
      state.accessToken = null;
      state.isLoggedIn = false;
      state.isRegistered = false;
    },
    setEmail(state, action) {
      if (state.userInfo) {
        state.userInfo.email = action.payload; // Оновлюємо email у userInfo
      } else {
        state.userInfo = { email: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        state.isRegistered = true;
        // state.isLoggedIn = true; // запис у local store
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.accessToken = action.payload.accessToken;
        // localStorage.setItem("accessToken", action.payload.accessToken);
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isRegistered = false;
      });
  },
});

export const { clearError, clearUser, setEmail, setToken } = userSlice.actions;
export const authReducer = userSlice.reducer;
