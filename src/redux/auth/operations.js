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

// Отримання інформаіі про поточного окристувача //
export const fetchCurrentUser = createAsyncThunk(
  "fetchCurrent",
  async (_, thunkApi) => {
    const accessToken = thunkApi.getState().auth.accessToken;

    if (!accessToken) {
      return thunkApi.rejectWithValue("No token found");
    }
    setAuthHeader(accessToken);
    try {
      //   setAuthHeader(token);
      const { data } = await authApi.get("/users");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch user info"
      );
    }
  }
);

// Оновлення даних користувача //
export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, thunkApi) => {
    const accessToken = thunkApi.getState().auth.accessToken;

    if (!accessToken) {
      return thunkApi.rejectWithValue("No token found");
    }
    setAuthHeader(accessToken);
    try {
      const { data } = await authApi.put("/users/update", userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Update failed");
    }
  }
);

// Нові токени //
export const refreshToken = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkApi) => {
    const refresh = thunkApi.getState().auth.accessToken;

    if (!refresh) return thunkApi.rejectWithValue("No refresh token provided");

    try {
      const { data } = await authApi.post("/auth/refresh", { refresh });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to refresh token"
      );
    }
  }
);
