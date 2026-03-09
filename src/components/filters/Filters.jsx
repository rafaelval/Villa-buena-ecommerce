import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./Filters.css";
import { strings } from "../../utils/strings";

const Filters = ({
  category,
  categories,
  searchParam,
  sort,
  setSearchParams,
}) => {
  const [searchInput, setSearchInput] = useState(searchParam);
  const debouncedSearch = useDebounce(searchInput, 500);
  const s = strings

  useEffect(() => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (category) params.set("category", category);
      else params.delete("category");

      if (debouncedSearch) params.set("search", debouncedSearch);
      else params.delete("search");

      if (sort) params.set("sort", sort);
      else params.delete("sort");

      if (!params.has("page")) {
        params.set("page", "1");
      }

      return params;
    });
  }, [debouncedSearch, category, sort, setSearchParams]);

  const handleCategoryChange = (cat) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (cat) params.set("category", cat);
      else params.delete("category");

      if (searchInput) params.set("search", searchInput);
      else params.delete("search");

      if (sort) params.set("sort", sort);
      else params.delete("sort");

      params.set("page", "1");

      return params;
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (category) params.set("category", category);
      else params.delete("category");

      if (searchInput) params.set("search", searchInput);
      else params.delete("search");

      if (newSort) params.set("sort", newSort);
      else params.delete("sort");

      params.set("page", "1");

      return params;
    });
  };

  return (
    <>
      {/* Buscar y organizar */}
      <div className="row mb-4">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control filters-search-input"
            placeholder={s.search}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select filters-sort-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">{s.sort}</option>
            <option value="price-asc">{s.lowHigh}</option>
            <option value="price-desc">{s.highLow}</option>
          </select>
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button
          className={`filters-category-chip ${!category ? "active" : ""}`}
          onClick={() => handleCategoryChange("")}
        >
          {s.all}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={`filters-category-chip ${category === cat.slug ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Filters;
