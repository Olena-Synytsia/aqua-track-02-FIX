import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    selectedImage: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    clearImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { setImage, clearImage } = imageSlice.actions;
export const avatarReducer = imageSlice.reducer;
