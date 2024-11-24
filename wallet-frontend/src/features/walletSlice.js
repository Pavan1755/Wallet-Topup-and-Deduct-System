import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setBalance, setLoading, setError } = walletSlice.actions;
export const selectBalance = (state) => state.wallet.balance;

export default walletSlice.reducer;
