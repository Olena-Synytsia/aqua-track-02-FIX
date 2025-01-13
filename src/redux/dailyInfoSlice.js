import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{ id: 1, time: "10:50", volume: "100" }],
  operationType: "add",
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
  },
});

export const selectWaterItem = (state) => state.waterItem.items;
export const selectOperationType = (state) => state.waterItem.operationType;

export const waterItemReducer = slice.reducer;
export const { addItems, setOperationType } = slice.actions;
