import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  categories: [],
  topSales: [],
  searchParams: '',
  catalogItem: {
    selectedCount: 1,
    selectedSize: '0 US',
    statusSelect: false,
  },
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    initItems(state, action) {
      state.list = action.payload;
    },
    initCategories(state, action) {
      state.categories = action.payload;
    },
    loadTopSales(state, action) {
      state.topSales = action.payload;
    },
    loadItems(state, action) {
      state.list = [...state.list, ...action.payload];
    },
    setSearchParams(state, action) {
      state.searchParams = action.payload;
    },
    setCatalogItem(state, action) {
      state.catalogItem = { ...state.catalogItem, ...action.payload};
    }
  },
});

export const {
  initItems, initCategories, loadTopSales, loadItems, setSearchParams, setCatalogItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;