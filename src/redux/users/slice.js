import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, updateUser } from "./operations";

const initialState = {
  user: {
    // userId: "",
    gender: null,
    name: null,
    email: null,
    weight: null,
    activeTime: null,
    photo: null,
    waterNorma: null,
    // waterToDrink: null,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState(state) {
      state.user = {
        // userId: "",
        gender: null,
        name: null,
        email: null,
        weight: null,
        activeTime: null,
        photo: null,
        waterNorma: null,
        // waterToDrink: null,
      };
      state.loading = false;
      state.error = null;
    },
    // setUserId(state, action) {
    //   state.user.userId = action.payload; // Оновлюємо userId
    // },
    // setEmail(state, action) {
    //   if (state.user) {
    //     state.user = { ...state.user, name: action.payload };
    //   } else {
    //     state.user = { email: action.payload };
    //   }
    // },
    setName(state, action) {
      if (state.user) {
        state.user.name = action.payload;
      } else {
        state.user = { name: action.payload };
      }
    },
    setImage: (state, action) => {
      state.user.photo = action.payload;
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

export const { clearUserState, setName, setImage } = userSlice.actions;

export const userReducer = userSlice.reducer;
