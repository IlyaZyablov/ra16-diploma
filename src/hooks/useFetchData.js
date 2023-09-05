import fetchData from '../func/fetchData';
import { useState } from 'react';


export default function useFetchData() {
  const [topSalesLoading, setTopSalesLoading] = useState(true);
  const [catalogItemLoading, setCatalogItemLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const topSalesDB = {
    loading: topSalesLoading,
    getInfo() {
      setTopSalesLoading(true);
  
      const result = fetchData('top-sales', { method: 'GET' }, () => setTopSalesLoading(false));
      return result;
    },
  };

  const catalogItemDB = {
    loading: catalogItemLoading,
    getInfo(id) {
      setCatalogItemLoading(true);

      const result = fetchData(`items/${id}`, { method: 'GET' }, () => setCatalogItemLoading(false));
      return result;
    },
  };

  const checkoutDB = {
    postInfo(data) {
      const result = fetchData('order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return result;
    },
  };

  const categoriesDB = {
    loading: categoriesLoading,
    getInfo() {
      setCategoriesLoading(true);
  
      const result = fetchData('categories', { method: 'GET' }, () => setCategoriesLoading(false));
      return result;
    },
  }

  const itemsDB = {
    loading: itemsLoading,
    getInfo(searchData) {
      setItemsLoading(true);

      let requires = '?';

      if (searchData && searchData.categoryId !== 0) {
        requires = requires + `categoryId=${searchData.categoryId}`;
      }

      if (searchData && searchData.offset !== 0) {
        if (requires.length === 1) {
          requires = requires + `offset=${searchData.offset}`;
        } else {
          requires = requires + `&offset=${searchData.offset}`;
        }
      }

      if (searchData && searchData.params.length !== 0) {
        if (requires.length === 1) {
          requires = requires + `q=${searchData.params}`;
        } else {
          requires = requires + `&q=${searchData.params}`;
        }
      }

      if (requires.length === 1) requires = '';
  
      const result = fetchData(`items${requires}`, { method: 'GET' }, () => setItemsLoading(false));
      return result;
    },
  }

  return {
    topSalesDB, catalogItemDB, checkoutDB, categoriesDB, itemsDB
  };
}
