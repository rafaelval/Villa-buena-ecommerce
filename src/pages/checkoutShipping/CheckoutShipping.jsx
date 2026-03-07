import { useNavigate } from "react-router-dom";
import { CheckoutStepper } from "../../components/checkoutStepper/CheckoutStepper";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import "./CheckoutShipping.css";

export const CheckoutShipping = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout/payment");
  };

  return (
    <div className="container shipping-container">
      <div className="shipping-stepper-wrapper">
        <CheckoutStepper step={2} />
      </div>

      <h2 className="shipping-title">Shipping Information</h2>

      <div className="row">
        {/* formulario de envio */}
        <div className="col-md-6 shipping-form-col">
          <form onSubmit={handleSubmit} className="shipping-form">
            <input
              className="form-control shipping-input mb-3"
              placeholder="Full name"
              required
            />

            <input
              className="form-control shipping-input mb-3"
              placeholder="Address"
              required
            />

            <input
              className="form-control shipping-input mb-3"
              placeholder="City"
              required
            />

            <button
              type="submit"
              className="shipping-submit-btn"
            >
              Continue to Payment
            </button>
          </form>
        </div>

        {/* resumen de compra */}
        <div className="col-md-5 offset-md-1 shipping-summary-col">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};