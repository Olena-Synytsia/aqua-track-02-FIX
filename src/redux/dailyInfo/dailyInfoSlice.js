import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{ id: 1, time: "10:50", volume: "100" }],
  operationType: "add",
  isModalOpen: false,
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
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const selectIsModalOpen = (state) => state.waterItem.isModalOpen;
export const selectWaterItem = (state) => state.waterItem.items;
export const selectOperationType = (state) => state.waterItem.operationType;

export const waterItemReducer = slice.reducer;
export const { addItems, setOperationType, updateItem, openModal, closeModal } =
  slice.actions;
