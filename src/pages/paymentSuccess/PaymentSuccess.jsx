import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./PaymentSuccess.css";

export const PaymentSuccess = () => {
  const { state } = useLocation();
  const orderId = state?.orderId ?? "—";

  return (
    <div className="container success-container">
      <div className="success-card">
        <CheckCircle size={64} className="success-icon" />
        <h2 className="success-title">Payment Successful</h2>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>
        <div className="success-order-id">
          <span className="success-order-label">Order ID:</span>
          <strong className="success-order-value">{orderId}</strong>
        </div>
        <Link to="/" className="success-btn">Continue Shopping</Link>
      </div>
    </div>
  );
};