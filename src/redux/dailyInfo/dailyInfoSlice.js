import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterItem } from "./dailyInfoOps.js";

const initialState = {
  items: [],
  operationType: "add",
  isError: false,
  isLoading: false,
};

const slice = createSlice({
  name: "waterItem",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    setOperationType: (state, action) => {
      state.operationType = action.payload;
    },
    updateItem: (state, action) => {
      const { id, time, volume } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex] = { ...state.items[itemIndex], time, volume };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWaterItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectWaterItem = (state) => state.waterItem.items;
export const selectOperationType = (state) => state.waterItem.operationType;
export const selectIsError = (state) => state.waterItem.isError;
export const selectIsLoading = (state) => state.waterItem.isLoading;

export const waterItemReducer = slice.reducer;
export const { addItems, setOperationType, updateItem } = slice.actions;
