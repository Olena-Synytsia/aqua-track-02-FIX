import { createAsyncThunk } from "@reduxjs/toolkit";

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
