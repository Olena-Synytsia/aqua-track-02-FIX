import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations.js";

export const fetchWaterItem = createAsyncThunk(
  "fetchWaterItem",
  async (date, thunkApi) => {
    try {
      const { data } = await authApi.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addWaterItem = createAsyncThunk(
  "addWaterItem",
  async (body, thunkApi) => {
    try {
      const { data } = await authApi.post("/water", body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
