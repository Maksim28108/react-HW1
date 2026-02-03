import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import cartReducer from "../../store/orderSlice";
import Header from "./Header";

vi.mock("../../theme/ThemeContext", () => ({
  useTheme: () => ({
    resolved: "dark",
    toggle: vi.fn(),
    mode: "dark",
    setMode: vi.fn(),
  }),
}));

describe("Header cart UI", () => {
  it("shows cart count and total", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          items: [
            { id: 1, title: "Pizza", price: 10, qty: 2 }, 
          ],
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );


    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("$20.00")).toBeInTheDocument();
  });
});
