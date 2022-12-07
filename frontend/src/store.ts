import { configureStore } from '@reduxjs/toolkit';
import drawer from './slices/drawerSlice';
import accordian from './slices/AccordianSlice';

import tree from './slices/treeSlice';
import node from './slices/nodeSlice';
import tokens from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    drawer: drawer,
    accordian: accordian,
    tree: tree,
    node: node,
    tokens: tokens,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
