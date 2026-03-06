import { useCartStore } from "../../store/useCartStore";

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div
      className="card p-4"
      style={{
        position: "sticky",
        top: "100px",
      }}
    >
      <h5 className="mb-3">Order Summary</h5>

      {cart.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between mb-2"
        >
          <span>
            {item.title} x{item.qty}
          </span>

          <span>${(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}

      <hr />

      <div className="d-flex justify-content-between fw-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};