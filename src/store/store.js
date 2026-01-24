import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mealsReducer from "./mealsSlice";
import cartReducer from "./orderSlice";

function loadCart() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  } catch {}
});
