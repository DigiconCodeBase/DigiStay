import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  theme: 'light',
  fontSize: 'normal',
  notifications: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Change language
    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // Change theme (light/dark)
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Change font size
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },

    // Toggle notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    // Reset settings to default
    resetSettings: (state) => {
      state.language = 'en';
      state.theme = 'light';
      state.fontSize = 'normal';
      state.notifications = true;
    },
  },
});

export const { setLanguage, setTheme, setFontSize, setNotifications, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
