import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useRef, useState } from "react";

import {
  initItems, loadItems, setSearchParams, initCategories,
} from "../store/itemsSlice";

import Preloader from "./Preloader";
import Categories from "./Categories";
import ItemsList from "./ItemsList";
import LoadMoreButton from "./LoadMoreButton";
import SearchBar from "./SearchBar";

function Catalog() {
  const location = useLocation();
  const categories = useSelector(state => state.items.categories);
  const items = useSelector(state => state.items.list);
  const searchParams = useSelector(state => state.items.searchParams);
  const [error, setError] = useState(null);
  const { categoriesDB, itemsDB } = useFetchData();
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState({
    selected: 0, offset: 0,
  });
  const loadMoreButton = useRef();

  async function onSelectCategory(evt) {
    let dataID = 0;
    if (evt) {
      dataID = parseInt(evt.target.dataset.id, 10);
    }

    setLocalState({ selected: dataID, offset: 0 });
  }

  async function loadMore(evt) {
    setLocalState({ ...localState, offset: localState.offset + 6 });
    evt.target.blur();
  }

  const handleCatalogForm = evt => {
    evt.preventDefault();

    dispatch(setSearchParams(evt.target.elements[0].value));
  }

  useEffect(() => {
    setError(null);

    if (localState.offset === 0) {
      categoriesDB.getInfo()
        .then(result => {
          dispatch(initCategories(result));
        })
        .catch(error => setError(error));
    }

    itemsDB.getInfo({
      categoryId: localState.selected,
      offset: localState.offset,
      params: location.pathname === '/catalog' ? searchParams : '',
    })
      .then(result => {
        if (localState.offset === 0) {
          dispatch(initItems(result));
        } else {
          dispatch(loadItems(result));
        }

        if (result.length < 6) {
          setTimeout(() => { // поставил таймаут, иначе не успевает ref поймать
            loadMoreButton.current.style.display = 'none';
          }, 200);
        }
      })
      .catch(error => setError(error));
  }, [localState.selected, localState.offset, searchParams]);

  const mainSection = (
    <>
      <Categories list={categories} selected={localState.selected} onSelect={evt => onSelectCategory(evt)} />
      <ItemsList list={items} />
    </>
  );

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {location.pathname === '/catalog' &&
        <SearchBar searchData={searchParams} handleSubmit={handleCatalogForm}/>
      }

      {itemsDB.loading || categoriesDB.loading ? (
        localState.offset === 0 ? (
          <Preloader />
        ) : (
          <>
            {mainSection}
            <Preloader />
          </>
        )
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке карточек товаров!</p>
        ) : (
          <>
            {mainSection}
            <LoadMoreButton loadMoreButton={loadMoreButton} handleMore={loadMore} />
          </>
        )
      )}
    </section>
  )
}

export default Catalog;