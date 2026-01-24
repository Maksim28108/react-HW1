import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "../api/meals";

export const loadMeals = createAsyncThunk(
  "meals/loadMeals",
  async (_, { signal }) => {
    return await fetchMeals(signal);
  },
);

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    items: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMeals.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loadMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "load error";
      });
  },
});

export default mealsSlice.reducer;

export const selectMeals = (state) => state.meals.items;

export const selectMealsStatus = (state) => state.meals.status;

export const selectMealsError = (state) => state.meals.error;

export const selectCategories = (state) => {
  const meals = state.meals.items;

  const unique = Array.from(
    new Set(meals.map((m) => m.category).filter(Boolean)),
  );

  return unique.map((c) => ({ label: c, value: c }));
};
