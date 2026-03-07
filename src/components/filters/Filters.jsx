import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import "./Filters.css";

const Filters = ({
  category,
  categories,
  searchParam,
  sort,
  setSearchParams,
}) => {
  const [searchInput, setSearchInput] = useState(searchParam);
  const debouncedSearch = useDebounce(searchInput, 500);

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
            placeholder="Search products..."
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
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button
          className={`filters-category-chip ${!category ? "active" : ""}`}
          onClick={() => handleCategoryChange("")}
        >
          All
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
