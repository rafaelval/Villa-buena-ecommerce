import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">
        {/* LEFT - PRODUCTS */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-3 d-flex align-items-center justify-content-center p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      maxHeight: "120px",
                      objectFit: "contain",
                    }}
                    className="img-fluid"
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="fw-bold text-danger mb-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-muted small mb-2">
                      Unit: ${item.price.toFixed(2)}
                    </p>

                    {/* QTY Controls */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Order Summary</h5>

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span className="text-danger fs-5">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-warning w-100 py-2"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="btn btn-link text-muted w-100 mt-2"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
