import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  announcements: {
    number: 0,
  },
  reports: {
    // ts feedback
    feedbackFormUser: {
      id: '',
      fullname: '',
    },
    // cfi reporting
    selectedUserReport: {
      id: '',
      fullname: '',
    },
  },
  utilities: {
    cfiTypeAssessment: {
      id: '',
      name: '',
      config: {},
    },
    // cfi assessment
    cfiAssessment: {
      userId: '', // can be owner (self) or staff (peer)
      userFullname: '',
      type: '', // TECHNICAL or BEHAVIOURAL
      isSelfReview: false,
    },
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    initAppRedux: (state, action) => {
      state = initialState
    },
    // for infividual reports
    setAppReport: (state, action) => {
      state.reports = {
        ...state.reports,
        ...action.payload,
      }
    },
    // unused
    setAppAnnouncements: (state, action) => {
      state.announcements = {
        ...state.announcements,
        ...action.payload,
      }
    },
    setUtilities: (state, action) => {
      state.utilities = {
        ...state.utilities,
        ...action.payload,
      }
    }
  }
});

export const { initAppRedux, setAppReport, setAppAnnouncements, setUtilities } = appSlice.actions;
export default appSlice.reducer;
