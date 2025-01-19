import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations.js";

export const fetchWaterItem = createAsyncThunk(
  "fetchWaterItem",
  async (date, thunkApi) => {
    try {
      const { data } = await authApi.get(`/water/day/${date}`);
      return data.data.waterDayByHour;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addWaterItem = createAsyncThunk(
  "addWaterItem",
  async (item, thunkApi) => {
    try {
      const { data } = await authApi.post("/water", item);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateWaterItem = createAsyncThunk(
  "updateWaterItem",
  async (item, thunkApi) => {
    try {
      const { data } = await authApi.patch(`water/${item.id}`, item);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
