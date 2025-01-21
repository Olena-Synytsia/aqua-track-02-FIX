import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWaterNorma, getWaterPercent } from "./operations.js";

export const fetchWaterNorma = createAsyncThunk(
  "waterNorma/fetchWaterNorma",
  async () => {
    const waterNorma = await getWaterNorma();
    console.log("get water norma", waterNorma);
    return waterNorma;
  }
);

export const fetchWaterPercent = createAsyncThunk(
  "waterNorma/fetchWaterPercent",
  async (date) => {
    const dayPercent = await getWaterPercent(date);
    console.log("get water norma", dayPercent);
    return dayPercent;
  }
);

const waterSlice = createSlice({
  name: "waterNorma",
  initialState: {
    dailyGoal: 0,
    status: "idle",
    waterData: 0,
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterNorma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWaterNorma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyGoal = action.payload;
        console.log("slice action", action);
      })
      .addCase(fetchWaterNorma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWaterPercent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWaterPercent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = action.payload;
        console.log("State Water percent:", state.waterData);
      })
      .addCase(fetchWaterPercent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default waterSlice.reducer;
