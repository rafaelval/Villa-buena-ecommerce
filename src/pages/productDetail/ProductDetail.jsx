import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";
import { useUIStore } from "../../store/uiStore";
import "./ProductDetail.css";

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
      <div className="container py-5">
        <div className="product-detail-loading">
          <div className="spinner-border" role="status" />
          <h4 className="mt-3">Loading product...</h4>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-5">
        <div className="product-detail-error">
          <h4>Product not found</h4>
          <button
            className="btn-secondary-custom"
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
      thumbnail: product.thumbnail,
    });
    showToast("Added to cart");
  };

  // funcion para renderizar estrellas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="container product-detail-container">
      <button className="product-detail-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row g-5">
        {/* Contenedor de imagenes */}
        <div className="col-md-6">
          <div className="product-detail-gallery">
            <div className="product-detail-thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} - ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`product-detail-thumb ${
                    mainImage === img ? "active" : ""
                  }`}
                />
              ))}
            </div>

            <div className="product-detail-main-image">
              <img src={mainImage} alt={product.title} className="img-fluid" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6">
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.title}</h1>

            {/* Calificaciones */}
            {product.rating && (
              <div className="product-detail-rating">
                <div className="product-detail-stars">
                  {typeof product.rating === "number" ? (
                    <>
                      <span className="product-detail-star-filled">
                        {renderStars(product.rating)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="product-detail-star-filled">
                        {renderStars(product.rating.rate)}
                      </span>
                    </>
                  )}
                </div>
                <span className="product-detail-rating-text">
                  {typeof product.rating === "number"
                    ? `(${product.rating})`
                    : `(${product.rating.count} reviews)`}
                </span>
              </div>
            )}

            <div className="product-detail-price-container">
              <span className="product-detail-price">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage && (
                <span className="product-detail-discount-badge">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-actions">
              <button
                className="product-detail-add-btn btn-primary-custom"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="product-detail-buy-btn btn-secondary-custom"
                onClick={() => navigate("/cart")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
