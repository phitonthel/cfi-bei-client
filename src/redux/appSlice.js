import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  announcements: {
    number: 0,
  },
  reports: {
    feedbackFormUser: {
      id: '',
      fullname: '',
    },
    individualReportUser: {
      id: '',
      fullname: '',
    },
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    initAppRedux: (state, action) => {
      state = initialState
    },
    setAppReport: (state, action) => {
      state.reports = {
        ...state.reports,
        ...action.payload,
      }
    },
    setAppAnnouncements: (state, action) => {
      state.announcements = {
        ...state.announcements,
        ...action.payload,
      }
    }
  }
});

export const { initAppRedux, setAppReport, setAppAnnouncements } = appSlice.actions;
export default appSlice.reducer;
