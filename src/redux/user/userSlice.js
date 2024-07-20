import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    },
  },
});

export const { setLoggedIn, logout } = userSlice.actions;

export default userSlice.reducer;