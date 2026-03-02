import ProductCard from "../components/ProductCard";
import { useProducts } from "../features/products/useProducts";

export const Home = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading products...</h4>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-5 text-center">
        <h4>Error loading products</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Store</h2>

      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
