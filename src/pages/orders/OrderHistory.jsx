import { useUserStore } from "../../store/useUserStore";
import { Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "./OrderHistory.css";
import { strings } from "../../utils/strings";

export const OrderHistory = () => {
  const orders = useUserStore((state) => state.orders);
  const s = strings

  if (orders.length === 0) {
    return (
      <div className="container orders-empty">
        <ShoppingBag size={48} className="orders-empty-icon" />
        <h3>{s.noOrders}</h3>
        <p>{s.orderHead}</p>
        <Link to="/" className="orders-shop-btn">
          {s.startShop}
        </Link>
      </div>
    );
  }

  return (
    <div className="container orders-container">
      <h2 className="orders-title">{s.orderHist}</h2>

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
                      {s.ammount}: {item.qty}
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
                  {s.subt} ({order.items.reduce((a, i) => a + i.qty, 0)} items)
                </span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="orders-footer-row">
                <span className="orders-footer-label">{s.shipping}</span>
                <span className="orders-shipping-free">{s.free}</span>
              </div>
              <hr className="orders-divider" />
              <div className="orders-footer-total">
                <span>{s.total}</span>
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
