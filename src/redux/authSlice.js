import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload
    },
  }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
