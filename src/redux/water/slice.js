import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyWater: 0,
  waterList: [],
  selectedDate: new Date(),
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
  },
});

export const { setDailyWater, updateWaterList, setSelectedDate } =
  waterSlice.actions;
export default waterSlice.reducer;
