import { describe, it, expect } from "vitest";
import reducer, {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  CartItem,
} from "./orderSlice";

describe("cart slice reducers", () => {
  const itemBase: Omit<CartItem, "qty"> = {
    id: 1,
    title: "Pizza",
    price: 10,
    image: "x.png",
  };

  it("returns initial state for unknown action", () => {
    const state = reducer(undefined, { type: "UNKNOWN" });
    expect(state).toEqual({ items: [] });
  });

  it("addToCart adds new item with default qty=1", () => {
    const state = reducer(undefined, addToCart({ item: itemBase }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ ...itemBase, qty: 1 });
  });

  it("addToCart uses provided qty and clamps to minimum 1", () => {
    const state1 = reducer(undefined, addToCart({ item: itemBase, qty: 3 }));
    expect(state1.items[0].qty).toBe(3);

    const state2 = reducer(undefined, addToCart({ item: itemBase, qty: 0 }));
    expect(state2.items[0].qty).toBe(1);

    const state3 = reducer(undefined, addToCart({ item: itemBase, qty: -5 }));
    expect(state3.items[0].qty).toBe(1);

    const state4 = reducer(undefined, addToCart({ item: itemBase, qty: "abc" as any }));
    expect(state4.items[0].qty).toBe(1);
  });

  it("addToCart increases qty when item already exists", () => {
    const s1 = reducer(undefined, addToCart({ item: itemBase, qty: 2 }));
    const s2 = reducer(s1, addToCart({ item: itemBase, qty: 3 }));

    expect(s2.items).toHaveLength(1);
    expect(s2.items[0].qty).toBe(5);
  });

  it("removeFromCart removes item by id", () => {
    const s1 = reducer(undefined, addToCart({ item: itemBase, qty: 2 }));
    const s2 = reducer(s1, removeFromCart(1));

    expect(s2.items).toHaveLength(0);
  });

  it("updateQty updates qty and clamps to minimum 1", () => {
    const s1 = reducer(undefined, addToCart({ item: itemBase, qty: 2 }));
    const s2 = reducer(s1, updateQty({ id: 1, qty: 7 }));

    expect(s2.items[0].qty).toBe(7);

    const s3 = reducer(s1, updateQty({ id: 1, qty: 0 }));
    expect(s3.items[0].qty).toBe(1);

    const s4 = reducer(s1, updateQty({ id: 1, qty: "abc" }));
    expect(s4.items[0].qty).toBe(1);
  });

  it("updateQty does nothing if item does not exist", () => {
    const s1 = reducer(undefined, updateQty({ id: 999, qty: 5 }));
    expect(s1.items).toHaveLength(0);
  });

  it("clearCart empties items", () => {
    const s1 = reducer(undefined, addToCart({ item: itemBase, qty: 2 }));
    const s2 = reducer(s1, clearCart());

    expect(s2.items).toEqual([]);
  });
});
