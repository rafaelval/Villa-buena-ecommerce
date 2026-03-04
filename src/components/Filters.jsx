import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

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
    setSearchParams({
      category,
      search: debouncedSearch,
      sort,
    });
  }, [debouncedSearch]);

  const handleCategoryChange = (cat) => {
    setSearchParams({
      category: cat,
      search: debouncedSearch,
      sort,
    });
  };

  const handleSortChange = (e) => {
    setSearchParams({
      category,
      search: debouncedSearch,
      sort: e.target.value,
    });
  };

  return (
    <>
      {/* SEARCH + SORT */}
      <div className="row mb-4">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mb-4 d-flex gap-2 flex-wrap">

  <button
    className={`category-chip ${!category ? "active" : ""}`}
    onClick={() => handleCategoryChange("")}
  >
    All
  </button>

  {categories.map((cat) => (
    <button
      key={cat.slug}
      className={`category-chip ${
        category === cat.slug ? "active" : ""
      }`}
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
