import { useNavigate } from "react-router-dom";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { CheckoutStepper } from "../components/checkout/CheckoutStepper";
import { useCartStore } from "../store/useCartStore";

export const CheckoutPayment = () => {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      return navigate("/");
    }

    clearCart();
    navigate("/payment/success");
  };

  return (
    <div className="container py-5">
      <CheckoutStepper step={3} />

      <div className="row mt-4">
        <div className="col-md-7">
          <div className="card p-4">
            <h4 className="mb-4">Payment Method</h4>

            <form onSubmit={handlePayment}>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">CVC</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button className="btn-primary-custom w-100 py-2">
                Pay Now
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};