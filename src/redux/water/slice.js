import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetWaterDay, updateWaterDay } from "./operations.js";

export const fetchWaterDay = createAsyncThunk(
  "water/fetchWaterDay",
  async (date) => {
    const response = await apiGetWaterDay(date);
    return response.data;
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async ({ date, amount }, thunkAPI) => {
    const response = await updateWaterDay({ date, amount });
    thunkAPI.dispatch(fetchWaterDay(date));
    return response.data;
  }
);

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
    resetWaterProgress: (state) => {
      state.percentDay = 0;
      state.consumedWater = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.percentDay = action.payload.percent;
        state.consumedWater = action.payload.consumed;
      })
      .addCase(fetchWaterDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWater.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.percentDay = action.payload.percent;
        state.consumedWater = action.payload.consumed;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDate,
  setDailyWater,
  updateWaterList,
  setSelectedDate,
  resetWaterProgress,
} = waterSlice.actions;
export default waterSlice.reducer;
