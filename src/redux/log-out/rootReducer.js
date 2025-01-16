import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import otherReducer from "./otherSlice";

const appReducer = combineReducers({
  user: userReducer,
  other: otherReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // Сброс состояния
  }
  return appReducer(state, action);
};

export default rootReducer;
