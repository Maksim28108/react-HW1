import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "../api/meals";

export const loadMeals = createAsyncThunk(
  "meals/loadMeals",
  async (_, { signal }) => {
    return await fetchMeals(signal);
  }
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
