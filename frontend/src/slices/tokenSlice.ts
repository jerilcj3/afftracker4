import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Tokens = Token[];

export type Token = {
  name: string;
  placeholder: string;
  value: string;
};

type TokenArray = {
  tokens: Array<Token>;
};

const initialState: TokenArray = { tokens: [] };

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    saveTokens: (state, action: PayloadAction<Array<Token>>) => {
      state.tokens = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTokens } = tokenSlice.actions;

export default tokenSlice.reducer;
