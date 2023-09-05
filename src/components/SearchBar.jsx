import { useEffect, useState } from "react";

function SearchBar(data) {
  const { searchData, handleSubmit } = data;
  const [form, setForm] = useState({ searchData: searchData || '' });

  const handleInput = evt => {
    console.log(evt.target.value);
    const { value } = evt.target;

    setForm({ searchData: value });
  }

  useEffect(() => {
    setForm({ searchData: searchData || '' });
  }, [searchData]);

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input className="form-control" placeholder="Поиск" value={form.searchData} onInput={handleInput} />
    </form>
  )
}

export default SearchBar;