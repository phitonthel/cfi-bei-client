import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import authReducer from './authSlice';
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
