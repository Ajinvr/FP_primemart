import { createSlice } from '@reduxjs/toolkit';

const initialState = {value:{
    user: null,
    token: null,
    isAuthenticated: false,
}}

 const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers:{
    authuser: (state, action) => {
        state.value = action.payload;       
      }
  }
});

export const {authuser} = AuthSlice.actions

export default AuthSlice.reducer;