import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://aqua-api-fkf8.onrender.com",
});

export const setAuthHeader = (token) => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await authApi.post("/auth/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await authApi.post("/auth/signin", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkApi) => {
  const token = thunkApi.getState().auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("No token found");
  }
  setAuthHeader(token);
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
    const token = thunkApi.getState().auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No token found");
    }
    setAuthHeader(token);
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
    const token = thunkApi.getState().auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No token found");
    }
    setAuthHeader(token);
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
    const refresh = thunkApi.getState().auth.token;

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
