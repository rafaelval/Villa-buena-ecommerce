import { useNavigate } from "react-router-dom";
import { CheckoutStepper } from "../components/checkout/CheckoutStepper";
import { OrderSummary } from "../components/checkout/OrderSummary";

export const CheckoutShipping = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/checkout/payment");
  };

  return (
    <div className="container py-5">
      <CheckoutStepper step={2} />

      <h2 className="mb-4">Shipping Information</h2>
      <div className="row">
        <form onSubmit={handleSubmit} className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="Full name"
            required
          />

          <input className="form-control mb-3" placeholder="Address" required />

          <input className="form-control mb-3" placeholder="City" required />

          <button className="btn-primary-custom w-100 py-2">Continue to Payment</button>
        </form>
        <div className="col-md-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
