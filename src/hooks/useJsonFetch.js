import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loadTopSales, initCategories, initItems } from '../store/itemsSlice';

export default function useJsonFetch(type, url, opts) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timestampRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const timestamp = Date.now();
      timestampRef.current = timestamp;
      setLoading(true);
      try {
        const response = await fetch(url, opts);
        if (!response.ok) { 
          throw new Error(response.statusText);
        }
        const result = await response.json();
        if (timestampRef.current === timestamp) {
          if (type === 'topSales') {
            dispatch(loadTopSales(result));
          } else if (type === 'items') {
            dispatch(initItems(result));
          } else if (type === 'categories') {
            dispatch(initCategories(result));
          }
        }
        setError(null);
      } catch (e) {
        setError(e);
      } finally { 
        setLoading(false); 
      }
    };

    fetchData();
  }, []);
  return { loading, error };
}