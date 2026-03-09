import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useUIStore } from "../../store/uiStore";
import "./ProductCard.css";
import { strings } from "../../utils/strings";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useUIStore((state) => state.showToast);
  const s = strings

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });

    showToast("Added to cart");
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="product-card h-100">
        <img
          src={product.thumbnail}
          className="product-card-image"
          alt={product.title}
        />

        <div className="card-body d-flex flex-column p-0 pt-3">
          <h6 className="product-card-title" title={product.title}>
            {product.title}
          </h6>

          <p className="product-card-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="product-card-actions">
            <Link
              to={`/product/${product.id}`}
              className="btn-secondary-custom"
            >
              {s.view}
            </Link>

            <button className="btn-primary-custom" onClick={handleAddToCart}>
              {s.add}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
