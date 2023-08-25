import { useLocation } from "react-router-dom";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { initItems, loadItems, setSearchParams } from "../store/itemsSlice";
import Categories from "./Categories";
import { useState } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import Preloader from "./Preloader";
import iziToast from 'izitoast';

function Catalog() {
  const location = useLocation();
  const categories = useSelector(state => state.items.categories);
  const items = useSelector(state => state.items.list);
  const searchParams = useSelector(state => state.items.searchParams);
  const categoriesStatus = useJsonFetch('categories', `${import.meta.env.VITE_MAIN_URL}/categories`, { method: 'GET' });
  const itemsStatus = useJsonFetch(
    'items',
    searchParams.length === 0 ? 
      `${import.meta.env.VITE_MAIN_URL}/items`
      :
      `${import.meta.env.VITE_MAIN_URL}/items?q=${searchParams.toLowerCase()}`
    ,
    { method: 'GET' },
  );
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState({
    selected: 0, offset: 6, loading: false, isLoadButtonDisable: false, loadingAnotherItems: false
  });

  async function onSelectCategory(evt = null) {
    setLocalState({ ...localState, loading: true });
    dispatch(setSearchParams(''));

    let dataID = 0;
    if (evt !== null) {
      dataID = parseInt(evt.target.dataset.id, 10);
    }

    let responseString = '';
    if (dataID === 0) {
      responseString = `${import.meta.env.VITE_MAIN_URL}/items`;
    } else {
      responseString = `${import.meta.env.VITE_MAIN_URL}/items?categoryId=${dataID}`;
    }

    let error = false;
    const result = await fetch(responseString, {
      method: 'GET',
    })
      .then(response => response.json())
      .catch(err => {
        console.error(err);
        error = true;
      });

    if (!error) {
      dispatch(initItems(result));
      setLocalState({ ...localState, selected: dataID, loading: false, offset: 6, isLoadButtonDisable: false });
    } else {
      iziToast.error({
        message: 'Произошла ошибка при выборе категории! Повторите попытку позже.',
        position: 'bottomCenter',
      });
      setLocalState({ ...localState, loading: false });
    }
  }

  async function loadAnotherItems(evt) {
    setLocalState({ ...localState, loadingAnotherItems: true });
    evt.target.blur();
    let responseString = '';
    if (localState.selected === 0) {
      responseString = `${import.meta.env.VITE_MAIN_URL}/items?offset=${localState.offset}`;
    } else {
      responseString = `${import.meta.env.VITE_MAIN_URL}/items?categoryId=${localState.selected}&offset=${localState.offset}`;
    }

    let error = false;
    const result = await fetch(responseString, {
      method: 'GET',
    })
      .then(response => response.json())
      .catch(err => {
        console.error(err);
        error = true;
      });

    if (!error) {
      if (result.length > 0) {
        dispatch(loadItems(result));
        setLocalState({
          ...localState, offset: localState.offset + result.length, isLoadButtonDisable: result.length < 6, loadingAnotherItems: false,
        });
      } else {
        setLocalState({ ...localState, isLoadButtonDisable: true, loadingAnotherItems: false });
      }
    } else {
      iziToast.error({
        message: 'Произошла ошибка при загрузке товаров! Повторите попытку позже.',
        position: 'bottomCenter',
      });
      setLocalState({ ...localState, loadingAnotherItems: false });
    }
  }

  const handleCatalogForm = async evt => {
    if (evt._reactName === 'onSubmit') {
      evt.preventDefault();
    }

    if (typeof evt.target.value === 'undefined') {
      setLocalState({ ...localState, isLoadButtonDisable: false });
      return;
    }

    setLocalState({ ...localState, loading: true });

    let error = false;
    const result = await fetch(`${import.meta.env.VITE_MAIN_URL}/items?q=${evt.target.value.toLowerCase()}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .catch(err => {
        console.error(err);
        error = true;
      });

    if (!error) {
      dispatch(initItems(result));
      setLocalState({ ...localState, loading: false, offset: 6, isLoadButtonDisable: true });
    } else {
      iziToast.error({
        message: 'Произошла ошибка при поиске товаров! Повторите попытку позже.',
        position: 'bottomCenter',
      });
      setLocalState({ ...localState, loading: false, offset: 6 });
    }
    console.log('result');
    console.log(result);
    console.log('handleCatalogForm');
    console.log(evt.target.value);
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {location.pathname === '/catalog' &&
        <form className="catalog-search-form form-inline" onSubmit={handleCatalogForm}>
          {searchParams.length > 0 ? (
            <input className="form-control" placeholder="Поиск" defaultValue={searchParams} onFocus={handleCatalogForm} onInput={handleCatalogForm} autoFocus />
          ) : (
            <input className="form-control" placeholder="Поиск" onChange={handleCatalogForm} />
          )}
        </form>
      }

      {categoriesStatus.loading ? (
        <Preloader />
      ) : (
        categoriesStatus.error ? (
          categoriesStatus.error
        ) : (
          <>
            <Categories list={categories} selected={localState.selected} onSelect={evt => onSelectCategory(evt)} />
            {itemsStatus.loading || localState.loading ? (
              <Preloader />
            ) : (
              itemsStatus.error ? (
                itemsStatus.error
              ) : (
                <>
                  <div className="row">
                    {items.length > 0 &&
                      items.map(elem =>
                        <Item key={elem.id} itemData={elem} />
                      )
                    }
                  </div>
                  {localState.loadingAnotherItems ? (
                    <Preloader />
                  ) : (
                    <>
                      {!localState.isLoadButtonDisable && 
                        <div className="text-center">
                          <button className="btn btn-outline-primary" onClick={loadAnotherItems}>Загрузить ещё</button>
                        </div>
                      }
                    </>
                  )}
                  
                </>
                
              )
            )}
          </>
          
        )
      )}
    </section>
  )
}

export default Catalog;