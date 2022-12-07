import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

interface tree {
  Tree: RawNodeDatum | RawNodeDatum[];
}

const initialState: tree = {
  Tree: {
    name: 'CAMPAIGN',
    attributes: {type: 'root'},    
    children: [],
  },  
};

export const TreeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    saveTree: (state, action: PayloadAction<tree>) => {
      state.Tree = action.payload.Tree;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTree } = TreeSlice.actions;

export default TreeSlice.reducer;
