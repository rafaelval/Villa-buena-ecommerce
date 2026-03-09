import { useCartStore } from "../../store/useCartStore";
import { strings } from "../../utils/strings";
import "./OrderSummary.css"; 

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);
  const s = strings

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="order-summary-card card">
        <div className="order-summary-empty">
          <p className="order-summary-empty-message">{s.empty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-card card">
      <h5 className="order-summary-title">{s.summary}</h5>

      {cart.map((item) => (
        <div key={item.id} className="order-summary-item">
          <div className="order-summary-item-info">
            <span className="order-summary-item-title">
              {item.title.length > 35 
                ? `${item.title.substring(0, 35)}...` 
                : item.title}
            </span>
            <span className="order-summary-item-quantity">
              {s.ammount}: {item.qty}
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
          {s.subt} ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="order-summary-row">
        <span className="order-summary-label">{s.shipping}</span>
        <span className="order-summary-shipping">{s.free}</span>
      </div>

      <hr className="order-summary-divider" />

      <div className="order-summary-total">
        <span>{s.total}</span>
        <span className="order-summary-total-amount">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};