import Catalog from "./Catalog";
import TopSales from "./TopSales";

function MainPage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <TopSales />
          <Catalog />
        </div>
      </div>
    </main>
  )
}

export default MainPage;