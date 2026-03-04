import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../features/products/useProduct";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";
import { useUIStore } from "../store/uiStore";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useUIStore((state) => state.showToast);

  const numericId = Number(id);

  const { data: product, isLoading, isError } = useProduct(numericId);

  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <h4 className="mt-3">Loading product...</h4>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h4>Product not found</h4>
          <button
            className="btn-secondary-custom mb-4"
            onClick={() => navigate("/")}
          >
            ← Back to Store
          </button>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];

  const mainImage =
    selectedImage && images.includes(selectedImage) ? selectedImage : images[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    });
    showToast("Added to cart 🛒");
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-5">
        {/*contenedor de miniaturas*/}
        <div className="col-md-6">
          <div className="d-flex">
            <div className="me-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.title}
                  onClick={() => setSelectedImage(img)}
                  className={`product-thumb mb-2 ${
                    mainImage === img ? "active" : ""
                  }`}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div className="flex-grow-1 text-center">
              <img
                src={mainImage}
                alt={product.title}
                className="img-fluid"
                style={{
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6 product-detail-card p-4">
          <h3>{product.title}</h3>

          {/*calificaciones*/}
          {product.rating && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                {typeof product.rating === "number" ? (
                  <>
                    <span className="text-warning">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="ms-2 text-muted">({product.rating})</span>
                  </>
                ) : (
                  <>
                    <span className="text-warning">
                      {"★".repeat(Math.floor(product.rating.rate))}
                      {"☆".repeat(5 - Math.floor(product.rating.rate))}
                    </span>
                    <span className="ms-2 text-muted">
                      ({product.rating.count} reviews)
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <h4 className="product-price mt-3">
            ${product.price.toFixed(2)}
            {product.discountPercentage && (
              <span className="badge bg-success ms-2">
                {product.discountPercentage}% OFF
              </span>
            )}
          </h4>

          <p className="lead mt-4">{product.description}</p>

          <div className="d-grid gap-3 mt-4">
            <button
              className="btn-primary-custom btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn-secondary-custom btn-lg"
              onClick={() => navigate("/cart")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
