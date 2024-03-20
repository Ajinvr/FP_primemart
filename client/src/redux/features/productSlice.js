import { createSlice } from '@reduxjs/toolkit';

const initialState = {value:[]}

 const productSlice = createSlice({
  name: "product",
  initialState,
  reducers:{
    storeproduct:(state,action) =>{
      state.value = action.payload
    }
  }
});

export const {storeproduct} = productSlice.actions

export default productSlice.reducer;
