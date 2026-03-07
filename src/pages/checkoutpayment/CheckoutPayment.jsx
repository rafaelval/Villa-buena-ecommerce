import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";
import { CheckoutStepper } from "../../components/checkoutStepper/CheckoutStepper";
import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import "./CheckoutPayment.css";

export const CheckoutPayment = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      return navigate("/");
    }

    setProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate("/payment/success");
    }, 1500);
  };

  return (
    <div className="container payment-container">
      {/* Wrapper del stepper para controlar espaciado */}
      <div className="payment-stepper-wrapper">
        <CheckoutStepper step={3} />
      </div>

      <div className="row">
        {/* Formulario de pago - columna izquierda */}
        <div className="col-md-7 payment-form-col">
          <div className="payment-card card">
            <h4 className="payment-title">Payment Method</h4>

            <form onSubmit={handlePayment} className="payment-form">
              <div className="payment-form-group">
                <label className="payment-label">Card Number</label>
                <input
                  type="text"
                  className="form-control payment-input"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="payment-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control payment-input"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="payment-label">CVC</label>
                  <input
                    type="text"
                    className="form-control payment-input"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="payment-submit-btn"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary - columna derecha con sticky */}
        <div className="col-md-5 payment-summary-col">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};