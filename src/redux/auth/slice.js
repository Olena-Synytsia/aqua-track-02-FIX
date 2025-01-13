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
  accessToken: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.userInfo = "";
      state.tokens = "";
      state.isAuthenticated = false;
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
        state.isAuthenticated = true;
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
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isAuthenticated = true;
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
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearUser, setEmail } = userSlice.actions;
export const authReducer = userSlice.reducer;
