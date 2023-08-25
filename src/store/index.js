import { configureStore } from '@reduxjs/toolkit'

import itemsReducer from './itemsSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartSlice,
  },
});
