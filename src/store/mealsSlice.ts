import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchMeals } from "../api/meals";
import type { RootState } from "./store";
 
export type Meal = {
  id: string | number;
  title: string;
  price: number | string;
  category?: string;
  description?: string;
  image?: string;
};

type MealsStatus = "idle" | "loading" | "succeeded" | "failed";

type MealsState = {
  items: Meal[];
  status: MealsStatus;
  error: string;
};

const initialState: MealsState = {
  items: [],
  status: "idle",
  error: "",
};

export const loadMeals = createAsyncThunk<Meal[], void>(
  "meals/loadMeals",
  async (_: void, { signal }) => {
    return (await fetchMeals(signal)) as Meal[];
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
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
        state.error = action.error?.message ?? "load error";
      });
  },
});

export default mealsSlice.reducer;

export const selectMeals = (state: RootState) => state.meals.items;
export const selectMealsStatus = (state: RootState) => state.meals.status;
export const selectMealsError = (state: RootState) => state.meals.error;

export type CategoryOption = { label: string; value: string };

export const selectCategories = createSelector([selectMeals], (meals): CategoryOption[] => {
  const unique = Array.from(
    new Set(meals.map((m) => m.category).filter(Boolean) as string[])
  );
  return unique.map((c) => ({ label: c, value: c }));
});
