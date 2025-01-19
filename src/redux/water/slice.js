import { createSlice } from "@reduxjs/toolkit";
import { apiGetWaterDay, updateWaterDay } from "./operations.js";

const initialState = {
  dailyWater: 0,
  waterList: [],
  selectedDate: new Date(),
  date: null,
  percentDay: 0,
  consumedWater: 0,
  isLoading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setDailyWater(state, action) {
      state.dailyWater = action.payload;
    },
    updateWaterList(state, action) {
      state.waterList = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(apiGetWaterDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetWaterDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.percentDay = action.payload.percent;
        state.consumedWater = action.payload.consumed;
      })
      .addCase(apiGetWaterDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWaterDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.percentDay = action.payload.percent;
        state.consumedWater = action.payload.consumed;
      })
      .addCase(updateWaterDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDate, setDailyWater, updateWaterList, setSelectedDate } =
  waterSlice.actions;
export default waterSlice.reducer;
