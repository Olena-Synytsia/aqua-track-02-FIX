import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../auth/operations.js";
import { requestGetWaterDay } from "./services";

export const apiGetWaterDay = createAsyncThunk(
  "water/getWaterDay",
  async (day, thunkAPI) => {
    try {
      const response = await requestGetWaterDay(day);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterDay = createAsyncThunk(
  "water/updateWaterDay",
  async ({ date, amount }, thunkApi) => {
    try {
      const { data } = await authApi.patch(`/water/day/${date}`, { amount });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
