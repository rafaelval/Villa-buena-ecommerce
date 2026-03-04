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
    // Mantener la página actual cuando se actualiza la búsqueda
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (category) params.set("category", category);
      else params.delete("category");

      if (debouncedSearch) params.set("search", debouncedSearch);
      else params.delete("search");

      if (sort) params.set("sort", sort);
      else params.delete("sort");

      // Mantener la página actual, si no existe se setea a 1
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

      // Resetear a página 1 cuando cambia categoría
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

      // Resetear a página 1 cuando cambia ordenamiento
      params.set("page", "1");

      return params;
    });
  };

  return (
    <>
      {/*buscar y organizar*/}
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

      {/* categorias */}
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
            className={`category-chip ${category === cat.slug ? "active" : ""}`}
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
