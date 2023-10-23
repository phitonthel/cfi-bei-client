import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import { loadState, saveState } from './utils'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});
