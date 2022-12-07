import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AccordianState {
  landerRotator: boolean;
  tokens: boolean;
  landerNode: boolean;
  emailRotator: boolean;
  emailNode: boolean;
}

const initialState: AccordianState = {
  landerRotator: true,
  tokens: true,
  landerNode: true,
  emailRotator: true,
  emailNode: true,
};

export const accordianSlice = createSlice({
  name: 'accordian',
  initialState,
  reducers: {
    landerRotator: (state, action: PayloadAction<boolean>) => {
      state.landerRotator = action.payload;
    },
    tokens: (state, action: PayloadAction<boolean>) => {
      state.tokens = action.payload;
    },
    landerNode: (state, action: PayloadAction<boolean>) => {
      state.landerNode = action.payload;
    },
    emailRotator: (state, action: PayloadAction<boolean>) => {
      state.emailRotator = action.payload;
    },
    emailNode: (state, action: PayloadAction<boolean>) => {
      state.emailNode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { landerRotator, tokens, landerNode, emailRotator, emailNode } =
  accordianSlice.actions;

export default accordianSlice.reducer;
