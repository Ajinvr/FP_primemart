import { createSlice } from '@reduxjs/toolkit';

const initialState = {value:[]}

const allusersSlice = createSlice({
    name:"allusers",
    initialState,
    reducers:{
        storeusers:(state,action) =>{
           state.value = action.payload
          }
    }
})

export const {storeusers} = allusersSlice.actions

export default allusersSlice.reducer;