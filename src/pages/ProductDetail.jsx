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
        <h4>Loading product...</h4>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found</h4>
      </div>
    );
  }

  const images = product.images || [product.image];

  const mainImage = selectedImage || images[0];

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row">
        {/* imagenes a la izquierda */}
        <div className="col-md-6">
          <div className="d-flex">
            {/* miniaturas */}
            <div className="me-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                />
              ))}
            </div>

            {/* Imagen principal */}
            <div className="flex-grow-1 text-center">
              <img
                src={mainImage}
                alt={product.title}
                style={{
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        {/* informacion general */}
        <div className="col-md-6">
          <h3>{product.title}</h3>

          <hr />

          <h4 className="text-danger">${product.price}</h4>

          <p className="mt-4">{product.description}</p>

          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-warning"
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                })
              }
            >
              Add to Cart
            </button>

            <button
              className="btn btn-dark"
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
