import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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

      <div className="card p-5 mx-auto shadow-sm" style={{maxWidth:"500px"}}>

        <CheckCircle size={64} color="#22c55e" className="mb-3" />

        <h2 className="mb-3">Payment Successful</h2>

        <p className="text-muted">
          Thank you for your purchase.
        </p>

        <p className="mt-3">
          Order ID: <strong>{orderId}</strong>
        </p>

        <Link
          to="/"
          className="btn-primary-custom w-100 py-2"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
};