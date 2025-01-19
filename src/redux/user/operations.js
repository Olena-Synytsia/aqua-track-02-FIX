import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations";

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
  async (updateData, thunkApi) => {
    try {
      const formData = new FormData();
      Object.keys(updateData).forEach((key) => {
        formData.append(key, updateData[key]);
      });

      const { data } = await authApi.patch("/users/current", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Error updating user");
    }
  }
);
