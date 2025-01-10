import { createSlice } from "@reduxjs/toolkit";
import { deleteWaterRecord } from "./operations.js";

const initialState = {
  waterList: [],
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.waterList = state.waterList.filter(
          (record) => record.id !== action.payload
        ); // Видалення запису зі стану
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = waterSlice.actions;
export const waterDeleteModal = waterSlice.reducer;
