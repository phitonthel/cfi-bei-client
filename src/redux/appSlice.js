import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
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
  },
  reducers: {
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

export const { setAppReport, setAppAnnouncements } = appSlice.actions;
export default appSlice.reducer;
