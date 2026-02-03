import { describe, it, expect } from "vitest";
import { selectCartItems, selectCartCount, selectCartTotal } from "./orderSlice";

describe("cart selectors", () => {
  it("selectCartItems returns items", () => {
    const state: any = {
      cart: {
        items: [{ id: 1, title: "Pizza", price: 10, qty: 2 }],
      },
    };

    expect(selectCartItems(state)).toHaveLength(1);
  });

  it("selectCartCount sums qty", () => {
    const state: any = {
      cart: {
        items: [
          { id: 1, title: "Pizza", price: 10, qty: 2 },
          { id: 2, title: "Burger", price: 5, qty: 3 },
        ],
      },
    };

    expect(selectCartCount(state)).toBe(5);
  });

  it("selectCartTotal sums qty * price and handles price as string", () => {
    const state: any = {
      cart: {
        items: [
          { id: 1, title: "Pizza", price: "10", qty: 2 }, // 20
          { id: 2, title: "Burger", price: 5, qty: 3 },   // 15
        ],
      },
    };

    expect(selectCartTotal(state)).toBe(35);
  });

  it("selectCartTotal treats missing/invalid price as 0", () => {
    const state: any = {
      cart: {
        items: [{ id: 1, title: "X", price: "" as any, qty: 2 }],
      },
    };

    expect(selectCartTotal(state)).toBe(0);
  });
});
