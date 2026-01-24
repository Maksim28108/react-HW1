import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  uid: string;
  email: string | null;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
