import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !form.fullName ||
      !form.address ||
      !form.city ||
      !form.zip ||
      !form.country
    ) {
      alert("Please fill all fields");
      return;
    }

    // Simulación de pago
    setTimeout(() => {
      clearCart();
      navigate("/payment/success");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>No items to checkout</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT - FORM */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h5 className="mb-3">Shipping Address</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-warning w-100 mt-3">
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h5>Order Summary</h5>
            <hr />

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.title.slice(0, 20)} x{item.qty}
                </span>
                <span>
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
