import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />

        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.title.slice(0, 50)}...</h6>

          <p className="fw-bold mt-auto">${product.price}</p>

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
                  image: product.image,
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
