import { configureStore } from '@reduxjs/toolkit'

import productSlice from '../features/productSlice'
import authSlice from '../features/authSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
    auth:authSlice
  },
});

export default store;