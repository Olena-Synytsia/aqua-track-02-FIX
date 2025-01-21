import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setToken } from "./slice";
// import { setToken } from "./slice";

export const authApi = axios.create({
  baseURL: "https://aqua-api-fkf8.onrender.com",
});

export const setAuthHeader = (accessToken) => {
  authApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const register = createAsyncThunk(
  "/auth/signup",
  async (credentials, thunkApi) => {
    try {
      const { data } = await authApi.post("/auth/signup", credentials);
      // const accessToken = data.accessToken;
      // thunkApi.dispatch(setToken({ accessToken }));
      // localStorage.setItem("accessToken", accessToken);
      setAuthHeader(data.accessToken);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "/auth/signin",
  async (credentials, thunkApi) => {
    try {
      // Надсилання запиту на логін
      const { data } = await authApi.post("/auth/signin", credentials);

      // Перевірка структури даних
      const accessToken = data?.data?.accessToken;
      if (!accessToken) {
        throw new Error("Access token not found in the response.");
      }

      // // Збереження токена в localStorage
      // localStorage.setItem("accessToken", accessToken);

      // console.log(
      //   "Access token after login (localStorage):",
      //   localStorage.getItem("accessToken")
      // );

      // Збереження токена в Redux
      thunkApi.dispatch(setToken({ accessToken }));

      // Встановлення заголовку авторизації
      setAuthHeader(accessToken);

      return data.data; // Повернення даних
    } catch (error) {
      console.error("Login error:", error.message);
      return thunkApi.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async (_, thunkApi) => {
  const accessToken = thunkApi.getState().auth.accessToken;

  if (!accessToken) {
    return thunkApi.rejectWithValue("No token found");
  }
  setAuthHeader(accessToken);
  try {
    await authApi.post("/auth/logout");
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
// export const refresh = createAsyncThunk("refresh", async (_, thunkApi) => {
//   const accessToken = thunkApi.getState().auth.accessToken;

//   if (!accessToken) {
//     return thunkApi.rejectWithValue("Unable to fetch user");
//   }

//   setAuthHeader(accessToken); // Передаємо токен у заголовках запиту
//   try {
//     const { data } = await authApi.post("/auth/refresh");
//     thunkApi.dispatch(setToken({ accessToken: data.accessToken }));
//     setAuthHeader(data.accessToken);
//     // Зберігаємо новий токен в localStorage
//     localStorage.setItem("accessToken", data.accessToken);
//     return data;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       // Якщо сервер відповів 401, токен вичерпано
//       localStorage.removeItem("accessToken"); // Видалити старий токен
//       return thunkApi.rejectWithValue("Token expired");
//     }
//     return thunkApi.rejectWithValue(error.message);
//   }
// });

// export const refresh = createAsyncThunk("refresh", async (_, thunkApi) => {
//   // refreshToken вже має бути в cookies
//   try {
//     const { data } = await authApi.post("/auth/refresh"); // Без необхідності передавати accessToken в заголовку
//     return data;
//   } catch (error) {
//     return thunkApi.rejectWithValue(error.message);
//   }
// });

// Нові токени //
export const refresh = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkApi) => {
    try {
      const accessToken = thunkApi.getState().auth.accessToken;

      if (!accessToken) {
        return thunkApi.rejectWithValue("No refresh token provided");
      }
      setAuthHeader(accessToken);

      const { data } = await authApi.post("/auth/refresh");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to refresh token"
      );
    }
  }
);
