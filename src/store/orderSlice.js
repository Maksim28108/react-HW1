import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const { item, qty = 1 } = action.payload;
      const q = Math.max(1, Number(qty) || 1);

      const existing = state.items.find((x) => x.id === item.id);

      if (existing) {
        existing.qty += q;
      } else {
        state.items.push({ ...item, qty: q });
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
    },

    updateQty(state, action) {
      const { id, qty } = action.payload;
      const q = Math.max(1, Number(qty) || 1);

      const existing = state.items.find((x) => x.id === id);
      if (existing) existing.qty = q;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.qty, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, x) => sum + x.qty * Number(x.price || 0), 0);

export default cartSlice.reducer;
