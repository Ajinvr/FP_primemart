import { configureStore } from '@reduxjs/toolkit'

import productSlice from '../features/productSlice'
import authSlice from '../features/authSlice';
import redirectSlice from '../features/redirectSlice';
import orderitem from '../features/orderitem';
import themeSlice from '../features/themeSlice';
import allusersSlice from '../features/allusersSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
    auth:authSlice,
    redirect:redirectSlice,
    order:orderitem,
    theme:themeSlice,
    users:allusersSlice
  },
});

export default store;