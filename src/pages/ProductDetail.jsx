import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../features/products/useProduct";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3">Loading product...</h4>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center" role="alert">
          <h4 className="alert-heading">Product not found</h4>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <hr />
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const mainImage = selectedImage || images[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
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
        {/* Images section */}
        <div className="col-md-6">
          <div className="d-flex">
            {/* Thumbnails */}
            <div className="me-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} - thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`img-thumbnail mb-2 ${mainImage === img ? 'border-primary border-2' : ''}`}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {/* Main image */}
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

        {/* Product info */}
        <div className="col-md-6">
          <h3 className="mb-3">{product.title}</h3>

          {product.rating && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <span className="text-warning fs-5">
                  {"★".repeat(Math.floor(product.rating.rate))}
                  {"☆".repeat(5 - Math.floor(product.rating.rate))}
                </span>
                <span className="text-muted ms-2">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          )}

          <hr />

          <h4 className="text-danger mb-4">
            ${Number(product.price).toFixed(2)}
            {product.discount && (
              <span className="badge bg-success ms-2">{product.discount}% OFF</span>
            )}
          </h4>

          <p className="lead mb-4">{product.description}</p>

          <div className="d-grid gap-3 mt-4">
            <button
              className="btn btn-warning btn-lg"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>

            <button
              className="btn btn-dark btn-lg"
              onClick={() => navigate("/cart")}
            >
              <i className="bi bi-lightning-charge me-2"></i>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};