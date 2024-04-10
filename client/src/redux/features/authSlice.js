import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    user: null,
    token: null,
    isAuthenticated: false,
    usr:null
  }
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authuser: (state, action) => {
      state.value = action.payload;       
    },
    resetAuth: (state) => {
      state.value = initialState.value;
    }
  }
});

export const { authuser, resetAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
