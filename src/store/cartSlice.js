import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], totalPrice: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      let result = false;
      for (let i = 0; i < state.list.length; i++) {
        const elem = state.list[i];
        if (elem.id === action.payload.id && elem.size === action.payload.size) {
          elem.count += action.payload.count;
          result = true;
        }
      }

      if (!result) {
        state.list.push(action.payload);
      }
    },
    removeItem(state, action) {
      state.list = state.list.filter(elem => elem.id !== action.payload);
      if (state.list.length === 0) {
        localStorage.removeItem('cart');
      }
    },
    updateTotalPrice(state) {
      let result = 0;
      for (let i = 0; i < state.list.length; i++) {
        const elem = state.list[i];
        result += elem.count * elem.price;
      }

      state.totalPrice = result;
    },
    setItemsList(state, action) {
      state.list = action.payload;
      if (state.list.length === 0) {
        localStorage.removeItem('cart');
      }
    }
  },
});

export const { addItem, removeItem, updateTotalPrice, setItemsList } = cartSlice.actions;
export default cartSlice.reducer;