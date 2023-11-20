import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    initAuthRedux: (state, action) => {
      state = initialState
    },
    setAuth: (state, action) => {
      state.user = action.payload
    },
  }
});

export const { initAuthRedux, setAuth } = authSlice.actions;
export default authSlice.reducer;
