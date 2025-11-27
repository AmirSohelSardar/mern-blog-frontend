import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage on initial load
const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('currentUser');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return null;
  }
};

// Save user to localStorage
const saveUserToStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('currentUser', serializedUser);
  } catch (err) {
    // Ignore write errors
  }
};

// Remove user from localStorage
const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('currentUser');
  } catch (err) {
    // Ignore errors
  }
};

const initialState = {
  currentUser: loadUserFromStorage(),
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      saveUserToStorage(action.payload);
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      saveUserToStorage(action.payload);
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      removeUserFromStorage();
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      removeUserFromStorage();
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;