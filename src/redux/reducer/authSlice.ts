import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  email: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    signOut: state => {
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;