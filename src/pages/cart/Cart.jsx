import { CheckoutStepper } from "../../components/checkoutStepper/CheckoutStepper";
import { useCartStore } from "../../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="cart-empty-container">
          <h3 className="cart-empty-title">Your cart is empty</h3>
          <button
            className="cart-empty-btn"
            onClick={() => navigate("/")}
          >
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <CheckoutStepper step={1} />
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="row">
        {/* Listado de productos */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card card">
              <div className="row g-0">
                {/* FIX: clase cart-item-image-col para controlar la columna de imagen */}
                <div className="col-md-3 cart-item-image-col">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-image img-fluid"
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    {/* FIX: usamos cart-item-header para alinear título y precio */}
                    <div className="cart-item-header">
                      <Link to={`/product/${item.id}`} className="cart-item-title">
                        <h6 className="mb-1">{item.title}</h6>
                      </Link>
                      <p className="cart-item-price mb-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <p className="cart-item-unit-price text-muted small mb-2">
                      Unit: ${item.price.toFixed(2)}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="cart-qty-control">
                      <button
                        className="cart-qty-btn"
                        onClick={() => decreaseQty(item.id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-value">{item.qty}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => increaseQty(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn btn btn-link p-0"
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

        {/* FIX: clase cart-summary-col para manejar el sticky correctamente */}
        <div className="col-md-4 cart-summary-col">
          <div className="cart-summary-card card">
            <h5 className="cart-summary-title">Order Summary</h5>

            <div className="cart-summary-details">
              <div className="cart-summary-row">
                <span className="cart-summary-label">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="cart-summary-row">
                <span className="cart-summary-label">Shipping</span>
                <span className="text-success">Free</span>
              </div>

              <hr className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>Total</span>
                <span className="cart-summary-total-amount">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="cart-checkout-btn btn-primary-custom"
              onClick={() => navigate("/checkout/shipping")}
            >
              Proceed to Checkout
            </button>

            <button
              className="cart-continue-btn btn btn-link"
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
