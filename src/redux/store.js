import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice.js";
import { waterDeleteModal } from "./water-delete/slice.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    water: waterDeleteModal,
  },
});
