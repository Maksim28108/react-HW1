import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mealsReducer from "./mealsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealsReducer,
  },
});
