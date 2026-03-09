import { useUserStore } from "../../store/useUserStore";
import { Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "./OrderHistory.css";

export const OrderHistory = () => {
  const orders = useUserStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="container orders-empty">
        <ShoppingBag size={48} className="orders-empty-icon" />
        <h3>No orders yet</h3>
        <p>Your order history will appear here after your first purchase.</p>
        <Link to="/" className="orders-shop-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container orders-container">
      <h2 className="orders-title">Order History</h2>

      <div className="orders-list">
        {[...orders].reverse().map((order) => (
          <div key={order.id} className="orders-card card">
            <div className="orders-card-header">
              <div className="orders-card-meta">
                <Package size={15} />
                <span className="orders-id">#{order.id}</span>
              </div>
              <span className="orders-date">
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="orders-items">
              {order.items.map((item) => (
                <div key={item.id} className="orders-summary-item">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="orders-item-img"
                  />
                  <div className="orders-item-info">
                    <span className="orders-item-title">
                      {item.title.length > 40
                        ? `${item.title.substring(0, 40)}...`
                        : item.title}
                    </span>
                    <span className="orders-item-quantity">
                      Amount: {item.qty}
                    </span>
                  </div>
                  <span className="orders-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="orders-divider" />

            <div className="orders-card-footer">
              <div className="orders-footer-row">
                <span className="orders-footer-label">
                  Subtotal ({order.items.reduce((a, i) => a + i.qty, 0)} items)
                </span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="orders-footer-row">
                <span className="orders-footer-label">Shipping</span>
                <span className="orders-shipping-free">Free</span>
              </div>
              <hr className="orders-divider" />
              <div className="orders-footer-total">
                <span>Total</span>
                <span className="orders-total-value">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
