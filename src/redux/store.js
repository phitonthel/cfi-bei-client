import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import appReducer from './appSlice';
import { loadState, saveState } from './utils'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});
