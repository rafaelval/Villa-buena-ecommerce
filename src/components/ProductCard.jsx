import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="col-md-4 col-lg-3 mb-4 pt">
      <div className="card h-100 shadow-sm">
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

          <p className="fw-bold mt-auto text-primary">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="d-flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-dark btn-sm w-50"
            >
              View
            </Link>

            <button
              className="btn btn-dark btn-sm w-50"
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                })
              }
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
