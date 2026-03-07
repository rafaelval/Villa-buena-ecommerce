import { useCartStore } from "../../store/useCartStore";
import "./OrderSummary.css"; 

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="order-summary-card card">
        <div className="order-summary-empty">
          <p className="order-summary-empty-message">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-card card">
      <h5 className="order-summary-title">Order Summary</h5>

      {cart.map((item) => (
        <div key={item.id} className="order-summary-item">
          <div className="order-summary-item-info">
            <span className="order-summary-item-title">
              {item.title.length > 35 
                ? `${item.title.substring(0, 35)}...` 
                : item.title}
            </span>
            <span className="order-summary-item-quantity">
              Amount: {item.qty}
            </span>
          </div>
          <span className="order-summary-item-price">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      ))}

      <hr className="order-summary-divider" />

      <div className="order-summary-row">
        <span className="order-summary-label">
          Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="order-summary-row">
        <span className="order-summary-label">Shipping</span>
        <span className="order-summary-shipping">Free</span>
      </div>

      <hr className="order-summary-divider" />

      <div className="order-summary-total">
        <span>Total</span>
        <span className="order-summary-total-amount">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};