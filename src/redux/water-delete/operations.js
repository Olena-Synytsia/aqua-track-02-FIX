import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, setAuthHeader } from "../auth/operations.js";

export const deleteWaterRecord = createAsyncThunk(
  "water/deleteRecord",
  async (recordId, thunkApi) => {
    const token = thunkApi.getState().auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("User is not authenticated");
    }
    setAuthHeader(token);
    try {
      await authApi.delete(`/water/${recordId}`);
      return recordId; // Повертаємо ID запису для видалення локально
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to delete record"
      );
    }
  }
);
