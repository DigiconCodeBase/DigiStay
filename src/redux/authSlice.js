import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from '../components/common/enums';

// Helper function to get initial state from localStorage
const getPersistedState = () => {
  try {
    const persisted = localStorage.getItem('auth_state');
    if (persisted) {
      return JSON.parse(persisted);
    }
  } catch (error) {
    console.error('Error reading persisted auth state:', error);
  }
  return {
    isLoggedIn: false,
    userRole: null,
    currentScreen: UserRole.OWNER,
    username: null,
  };
};

// Helper function to persist state to localStorage
const persistState = (state) => {
  try {
    localStorage.setItem(
      'auth_state',
      JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userRole: state.userRole,
        currentScreen: state.currentScreen,
        username: state.username,
      })
    );
  } catch (error) {
    console.error('Error persisting auth state:', error);
  }
};

const initialState = getPersistedState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to login user
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userRole = action.payload.role;
      state.currentScreen = action.payload.role;
      state.username = action.payload.username;
      persistState(state);
    },
    
    // Action to logout user
    logout: (state) => {
      state.isLoggedIn = false;
      state.userRole = null;
      state.currentScreen = UserRole.OWNER;
      state.username = null;
      persistState(state);
    },
    
    // Action to switch between screens
    switchScreen: (state, action) => {
      state.currentScreen = action.payload;
      persistState(state);
    },
    
    // Action to switch role (already logged in)
    switchRole: (state, action) => {
      state.currentScreen = action.payload;
      persistState(state);
    },
  },
});

export const { login, logout, switchScreen, switchRole } = authSlice.actions;
export default authSlice.reducer;
