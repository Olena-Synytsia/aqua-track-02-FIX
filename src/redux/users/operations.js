import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations";
import { setAuthHeader } from "../auth/operations";

// Отримання інформаіі про поточного окристувача //
export const getCurrentUser = createAsyncThunk(
  "getCurrent",
  async (_, thunkApi) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return thunkApi.rejectWithValue("No token provided");
      }
      const response = await authApi.get("/users/current");

      setAuthHeader(accessToken);

      // Перевірка на те, чи правильний формат відповіді
      if (response && response.data && response.data.data) {
        return response.data.data; // Повертаємо дані користувача
      } else {
        return thunkApi.rejectWithValue("Invalid response structure");
      }
    } catch (error) {
      // Якщо помилка має структуру з властивістю message, то її можна використовувати
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch user info";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// Оновлення даних користувача //
export const updateUser = createAsyncThunk(
  "/users/current",
  async ({ data, accessToken }, thunkApi) => {
    console.log("Received token:", accessToken);
    console.log("Data to update:", data);
    // const accessToken = localStorage.getItem("accessToken");

    // console.log(thunkApi.getState());
    try {
      if (!accessToken) {
        console.error("Access token missing");
        return thunkApi.rejectWithValue("No token found");
      }
      setAuthHeader(accessToken);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await authApi.patch("/users/current", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Update response:", response.data);

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || "Error updating user");
    }
  }
);
