import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

export const PaymentSuccess = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  const [orderId] = useState(() =>
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container py-5 text-center">

      <h1 className="mb-4">Payment Successful 🎉</h1>

      <h4 className="mb-3">
        Order ID: <strong>{orderId}</strong>
      </h4>

      <p className="mb-4">
        Thank you for your purchase.
      </p>

      <Link to="/" className="btn-primary-custom w-100 py-2">
        Continue Shopping
      </Link>

    </div>
  );
};