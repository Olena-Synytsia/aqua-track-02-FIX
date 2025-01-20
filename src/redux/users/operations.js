import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations";
import { setAuthHeader } from "../auth/operations";

// Отримання інформаіі про поточного окристувача //
export const getCurrentUser = createAsyncThunk(
  "getCurrent",
  async (_, thunkApi) => {
    try {
      const { data } = await authApi.get("/users/current");
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch user info"
      );
    }
  }
);

// Оновлення даних користувача //
export const updateUser = createAsyncThunk(
  "/users/current",
  async ({ data, accessToken }, thunkApi) => {
    console.log("Received token:", accessToken);
    console.log("Data to update:", data);
    // const accessToken = thunkApi.getState().auth.accessToken;

    console.log(thunkApi.getState());
    try {
      if (!accessToken) {
        return thunkApi.rejectWithValue("No token found");
      }
      setAuthHeader(accessToken);

      const response = await authApi.patch("/users/current", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Error updating user");
    }
  }
);
