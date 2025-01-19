import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations.js";

const initialState = {
  userInfo: "",
  accessToken: "",
  isLoggedIn: false, // !!localStorage.getItem("accessToken"), // Логин считается успешным, если токен есть
  isRegistered: false,
  loading: false,
  error: null,
  isRefreshing: false,
};
console.log("Initial state token:", initialState.accessToken);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken); // Зберігаємо токен в localStorage
      state.isLoggedIn = true;
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
    // setEmail(state, action) {
    //   if (state.userInfo) {
    //     state.userInfo = { ...state.userInfo, name: action.payload };
    //   } else {
    //     state.userInfo = { email: action.payload };
    //   }
    // },
    // setName(state, action) {
    //   if (state.userInfo) {
    //     state.userInfo.name = action.payload; // Оновлюємо ім'я
    //   } else {
    //     state.userInfo = { name: action.payload };
    //   }
    // },
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
      // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      //   state.userInfo = action.payload;
      //   state.isLoggedIn = true;
      // })
      // .addCase(fetchCurrentUser.rejected, (state, action) => {
      //   state.error = action.payload;
      // })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.userInfo = action.payload;
      // })
      // .addCase(updateUser.rejected, (state, action) => {
      //   state.error = action.payload;
      // })
      // .addCase(refreshToken.fulfilled, (state, action) => {
      //   state.accessToken = action.payload;
      // })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isRegistered = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { clearError, setToken } = userSlice.actions;
export const authReducer = userSlice.reducer;
