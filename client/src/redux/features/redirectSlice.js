import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:'/'}

const redirectSlice = createSlice({
    name:"redirect",
    initialState,
    reducers:{
        setpath:(state,action)=>{
            state.value = action.payload
        }
    }
})


export const {setpath} = redirectSlice.actions

export default redirectSlice.reducer;
