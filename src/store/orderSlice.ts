import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type CartItem = {
  id: string | number;
  title: string;
  price: number | string;
  image?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

type AddToCartPayload = {
  item: Omit<CartItem, "qty">; 
  qty?: number;
};

type UpdateQtyPayload = {
  id: CartItem["id"];
  qty: number | string; 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { item, qty = 1 } = action.payload;
      const q = Math.max(1, Number(qty) || 1);

      const existing = state.items.find((x) => x.id === item.id);

      if (existing) {
        existing.qty += q;
      } else {
        state.items.push({ ...item, qty: q });
      }
    },

    removeFromCart(state, action: PayloadAction<CartItem["id"]>) {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
    },

    updateQty(state, action: PayloadAction<UpdateQtyPayload>) {
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

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, x) => sum + x.qty, 0);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, x) => sum + x.qty * Number(x.price || 0), 0);

export default cartSlice.reducer;
