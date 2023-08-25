import Item from "./Item";
import { useSelector } from "react-redux";
import useJsonFetch from "../hooks/useJsonFetch";
import Preloader from "./Preloader";

function TopSales() {
  const topSales = useSelector(state => state.items.topSales);
  const { loading, error } = useJsonFetch('topSales', `${import.meta.env.VITE_MAIN_URL}/top-sales`, { method: 'GET' });

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading ? (
        <Preloader />
      ) : (
        error || <div className="row">
          {topSales.length > 0 &&
            topSales.map(elem =>
              <Item key={elem.id} itemData={elem} />
            )
          }
        </div>
      )}
      
    </section>
  )
}

export default TopSales;