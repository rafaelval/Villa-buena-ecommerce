import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";
import { CheckoutStepper } from "../../components/checkoutStepper/CheckoutStepper";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "../../store/useUserStore";
import "./CheckoutPayment.css";
import { strings } from "../../utils/strings";

export const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const payment = useUserStore((state) => state.payment);
  const setPayment = useUserStore((state) => state.setPayment);
  const addOrder = useUserStore((state) => state.addOrder);

  const [formData, setFormData] = useState(payment);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const s = strings

  const validateExpiry = (value) => {
    if (value.length < 5) return "Format: MM/YY";
    const [month, year] = value.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (month < 1 || month > 12) return s.invalMonth;
    if (year < currentYear) return s.yearExp;
    if (year === currentYear && month < currentMonth) return s.monthExp;
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    if (name === "expiryDate") {
      const digits = value.replace(/\D/g, "").substring(0, 4);
      formattedValue =
        digits.length > 2
          ? `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
          : digits;
    }
    if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: formattedValue };
      setPayment(updated);
      return updated;
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/checkout/payment" },
      });
      return;
    }

    const newErrors = {};
    if (formData.cardNumber.length < 19)
      newErrors.cardNumber = s.fullNumReq;
    const expiryError = validateExpiry(formData.expiryDate);
    if (expiryError) newErrors.expiryDate = expiryError;
    if (formData.cvc.length < 3) newErrors.cvc = s.cvcReq;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (cart.length === 0) return navigate("/");

    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

    setProcessing(true);
    setTimeout(() => {
      addOrder({
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: cart.reduce((acc, item) => acc + item.price * item.qty, 0),
      });
      clearCart();

      navigate("/payment/success", { state: { orderId } });
    }, 1500);
  };

  return (
    <div className="container payment-container">
      <div className="payment-stepper-wrapper">
        <CheckoutStepper step={3} />
      </div>

      <div className="row">
        <div className="col-md-7 payment-form-col">
          <div className="payment-card card">
            <h4 className="payment-title">{s.payMeth}</h4>

            <form onSubmit={handlePayment} className="payment-form">
              <div className="payment-form-group">
                <label className="payment-label">{s.cardNbr}</label>
                <input
                  type="text"
                  name="cardNumber"
                  className={`form-control payment-input ${errors.cardNumber ? "is-invalid" : ""}`}
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <div className="error-container">{errors.cardNumber}</div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-1">
                  <label className="payment-label">{s.expire}</label>
                  <input
                    type="text"
                    name="expiryDate"
                    className={`form-control payment-input ${errors.expiryDate ? "is-invalid" : ""}`}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-container">{errors.expiryDate}</div>
                </div>

                <div className="col-md-6 mb-1">
                  <label className="payment-label">{s.cvc}</label>
                  <input
                    type="text"
                    name="cvc"
                    className={`form-control payment-input ${errors.cvc ? "is-invalid" : ""}`}
                    placeholder="123"
                    value={formData.cvc}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-container">{errors.cvc}</div>
                </div>
              </div>

              <button
                type="submit"
                className="payment-submit-btn"
                disabled={processing}
              >
                {processing ? s.processing : s.pay}
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-5 payment-summary-col">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
