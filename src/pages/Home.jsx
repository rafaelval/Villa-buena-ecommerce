import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useProducts } from "../features/products/useProducts";
import { useCategories } from "../features/products/useCategories";
import { useDebounce } from "../hooks/useDebounce";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";

  // Local input state
  const [searchInput, setSearchInput] = useState(searchParam);

  // Debounced search
  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts(category);

  const { data: categories = [] } = useCategories();

  // Update URL when debounce finishes
  useEffect(() => {
    setSearchParams({
      category,
      search: debouncedSearch,
      sort,
    });
  }, [debouncedSearch]);

  // Filter + Sort memoizado
  const processedProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (sort === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, debouncedSearch, sort]);

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
    <div className="container py-5">
      <h2 className="mb-4">Store</h2>

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
          className={`btn btn-sm ${
            !category ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              category === cat ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ERROR */}
      {isError && (
        <div className="alert alert-danger text-center mb-4">
          <h5>⚠️ Error loading products</h5>
          <p>{error?.message || "Something went wrong."}</p>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="row g-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : processedProducts.length === 0 ? (
          <div className="text-center py-5 w-100">
            <p className="text-muted">No products found</p>
          </div>
        ) : (
          processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};