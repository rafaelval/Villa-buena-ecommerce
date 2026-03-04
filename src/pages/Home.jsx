import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Filters from "../components/Filters";
import { useProducts } from "../features/products/useProducts";
import { useCategories } from "../features/products/useCategories";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts();

  const { data: categories = [] } = useCategories();

  const products = productsData?.products || [];

  const limit = 12;

  // 🔥 Filter + Sort (client-side)
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category === category
      );
    }

    if (searchParam) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, category, searchParam, sort]);

  // 🔥 Client-side pagination
  const totalPages = Math.ceil(processedProducts.length / limit);

  const paginatedProducts = processedProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  // 🔥 Cleaner URL updates
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (category) params.set("category", category);
    else params.delete("category");

    if (searchParam) params.set("search", searchParam);
    else params.delete("search");

    if (sort) params.set("sort", sort);
    else params.delete("sort");

    params.set("page", newPage);

    setSearchParams(params);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Store</h2>

      {/* FILTERS */}
      <Filters
        category={category}
        categories={categories}
        searchParam={searchParam}
        sort={sort}
        setSearchParams={setSearchParams}
      />

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
          Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-5 w-100">
            <p className="text-muted">No products found</p>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5 gap-2">
          <button
            className="btn btn-outline-dark btn-sm"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline-dark btn-sm"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};