/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { CheckoutStepper } from "../../components/checkoutStepper/CheckoutStepper";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { useUserStore } from "../../store/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import "./CheckoutShipping.css";
import { strings } from "../../utils/strings";

export const CheckoutShipping = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const shipping = useUserStore((state) => state.shipping);
  const setShipping = useUserStore((state) => state.setShipping);
  const hydrateFromAuth0 = useUserStore((state) => state.hydrateFromAuth0);
  const s = strings

  useEffect(() => {
    if (user) {
      hydrateFromAuth0(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout/payment");
  };

  return (
    <div className="container shipping-container">
      <div className="shipping-stepper-wrapper">
        <CheckoutStepper step={2} />
      </div>

      <h2 className="shipping-title">{s.shipInfo}</h2>

      <div className="row">
        <div className="col-md-6 shipping-form-col">
          <form onSubmit={handleSubmit} className="shipping-form">
            <input
              name="fullName"
              className="form-control shipping-input mb-3"
              placeholder="Full name"
              value={shipping.fullName}
              onChange={handleChange}
              required
            />

            <input
              name="address"
              className="form-control shipping-input mb-3"
              placeholder="Address"
              value={shipping.address}
              onChange={handleChange}
              required
            />

            <input
              name="city"
              className="form-control shipping-input mb-3"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange}
              required
            />

            <button type="submit" className="shipping-submit-btn">
              {s.contPay}
            </button>
          </form>
        </div>

        <div className="col-md-5 offset-md-1 shipping-summary-col">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
