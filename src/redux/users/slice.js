import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, updateUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    timeActive: null,
    dailyNorma: null,
    photo: null,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setEmail(state, action) {
      if (state.user) {
        state.user = { ...state.user, name: action.payload };
      } else {
        state.user = { email: action.payload };
      }
    },
    setName(state, action) {
      if (state.user) {
        state.user.name = action.payload; // Оновлюємо ім'я
      } else {
        state.user = { name: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Отримання поточного користувача
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Оновлення користувача
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState, setEmail, setName } = userSlice.actions;

export const userReducer = userSlice.reducer;
