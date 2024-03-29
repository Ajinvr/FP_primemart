import { createSlice } from '@reduxjs/toolkit';
const initialState = {value:[]}


const orderslice = createSlice({
    name: "order",
    initialState,
    reducers:{
      storeorderitem:(state,action) =>{
        state.value = action.payload
      }
    }
  });
  
  export const {storeorderitem} = orderslice.actions
  
  export default orderslice.reducer;
  