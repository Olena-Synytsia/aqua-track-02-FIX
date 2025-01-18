import { createSlice } from "@reduxjs/toolkit";
import {
  addWaterItem,
  fetchWaterItem,
  updateWaterItem,
} from "./dailyInfoOps.js";

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
    setOperationType: (state, action) => {
      state.operationType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        console.log(action.payload);
      })
      .addCase(updateWaterItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const selectWaterItem = (state) => state.waterItem.items;
export const selectOperationType = (state) => state.waterItem.operationType;
export const selectIsError = (state) => state.waterItem.isError;
export const selectIsLoading = (state) => state.waterItem.isLoading;

export const waterItemReducer = slice.reducer;
export const { addItems, setOperationType, updateItem } = slice.actions;
