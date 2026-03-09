import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./PaymentSuccess.css";
import { strings } from "../../utils/strings";

export const PaymentSuccess = () => {
  const { state } = useLocation();
  const orderId = state?.orderId ?? "—";
  const s =strings

  return (
    <div className="container success-container">
      <div className="success-card">
        <CheckCircle size={64} className="success-icon" />
        <h2 className="success-title">{s.paySucc}</h2>
        <p className="success-message">
          {s.thanksQuote}
        </p>
        <div className="success-order-id">
          <span className="success-order-label">{s.orderId}</span>
          <strong className="success-order-value">{orderId}</strong>
        </div>
        <Link to="/" className="success-btn">{s.contShop}</Link>
      </div>
    </div>
  );
};