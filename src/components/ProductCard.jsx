import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useUIStore } from "../store/uiStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useUIStore((state) => state.showToast);

  return (
    <div className="col-md-4 col-lg-3 mb-4 pt">
      <div className="product-card h-100">
        <img
          src={product.thumbnail || product.images?.[0]}
          className="card-img-top pt-3"
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate" title={product.title}>
            {product.title}
          </h6>

          <p className="fw-bold mt-auto product-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="d-flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="btn-secondary-custom w-50 text-center"
            >
              View
            </Link>

            <button
              className="btn-primary-custom w-50"
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                });

                showToast("Added to cart 🛒");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
