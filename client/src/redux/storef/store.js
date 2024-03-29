import { configureStore } from '@reduxjs/toolkit'

import productSlice from '../features/productSlice'
import authSlice from '../features/authSlice';
import redirectSlice from '../features/redirectSlice';
import orderitem from '../features/orderitem';

const store = configureStore({
  reducer: {
    product: productSlice,
    auth:authSlice,
    redirect:redirectSlice,
    order:orderitem
  },
});

export default store;