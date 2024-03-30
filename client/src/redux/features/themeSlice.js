import { createSlice } from '@reduxjs/toolkit';

const initialState ={value:{light:true}}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        themeset:(state, action) => {
            state.value = action.payload;       
          }
    }
})

export const {themeset} = themeSlice.actions

export default themeSlice.reducer;