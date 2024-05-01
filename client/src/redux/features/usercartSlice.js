import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:''}

const usercartSlice = createSlice({
    name:"cartitemnumber",
    initialState,
    reducers:{
        cartquantity:(state,action)=>{
            state.value = action.payload
        }
    }
})


export const {cartquantity} = usercartSlice.actions

export default usercartSlice.reducer;