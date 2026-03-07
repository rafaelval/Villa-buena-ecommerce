import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import ProductCard from "../components/productCard/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Filters from "../components/filters/Filters"
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

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

  const limit = 12;

  // filtrado y organizacion dentro de usememo
  const processedProducts = useMemo(() => {
    const products = productsData?.products || [];

    let filtered = [...products];

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchParam) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchParam.toLowerCase()),
      );
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [productsData, category, searchParam, sort]);

  const totalPages = Math.ceil(processedProducts.length / limit);

  const paginatedProducts = processedProducts.slice(
    (page - 1) * limit,
    page * limit,
  );

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

      <Filters
        className="category-chip"
        category={category}
        categories={categories}
        searchParam={searchParam}
        sort={sort}
        setSearchParams={setSearchParams}
      />

      {isError && (
        <div className="alert text-center mb-4">
          <h5>⚠️ Error loading products</h5>
          <p>{error?.message || "Something went wrong."}</p>
          <button className="btn-sm" onClick={() => refetch()}>
            Try Again
          </button>
        </div>
      )}

      {/*productos*/}
      <div className="row g-4">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-5 w-100">
            <p>No products found</p>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/*paginacion*/}
      {!isLoading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5 gap-2">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            Page {page} of {totalPages}
          </span>

          <button
            className="pagination-btn"
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
