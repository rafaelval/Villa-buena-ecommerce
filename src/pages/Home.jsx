import ProductCard from "../components/ProductCard";
import { useProducts } from "../features/products/useProducts";

export const Home = () => {
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3">Loading products...</h4>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">⚠️ Error Loading Products</h4>
          <p>{error?.message || "Failed to fetch products. Please try again."}</p>
          <hr />
          <div className="d-flex justify-content-center gap-2">
            <button 
              className="btn btn-outline-danger"
              onClick={() => refetch()} // Reintentar la petición
            >
              Try Again
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Validar que products existe y es un array
  if (!products || !Array.isArray(products)) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning" role="alert">
          <h4>No products available</h4>
          <p>The product list is currently empty.</p>
        </div>
      </div>
    );
  }

  // Renderizar productos
  return (
    <div className="container py-5">
      <h2 className="mb-4">Store</h2>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No products found</p>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};