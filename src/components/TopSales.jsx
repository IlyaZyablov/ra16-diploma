import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useState } from "react";

import { loadTopSales } from "../store/itemsSlice";

import ItemsList from "./ItemsList";
import Preloader from "./Preloader";

function TopSales() {
  const topSales = useSelector(state => state.items.topSales);
  const [error, setError] = useState(null);
  const { topSalesDB } = useFetchData();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(null);

    topSalesDB.getInfo()
      .then(result => {
        dispatch(loadTopSales(result));
      })
      .catch(error => setError(error));
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {topSalesDB.loading ? (
        <Preloader />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке карточек товаров!</p>
        ) : (
          <ItemsList list={topSales} />
        )
      )}
      
    </section>
  )
}

export default TopSales;