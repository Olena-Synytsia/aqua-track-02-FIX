import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice.js";
import { waterDeleteModal } from "./water-delete/slice.js";
import { waterItemReducer } from "./dailyInfo/dailyInfoSlice.js";
import { avatarReducer } from "./avatar/slice.js";

import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userReducer } from "./users/slice.js";

const persistConfig = {
  key: "auth-aqua",
  version: 1,
  storage,
  whitelist: ["accessToken"],
  blacklist: ["_persist"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    water: waterDeleteModal,
    waterItem: waterItemReducer,
    image: avatarReducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
