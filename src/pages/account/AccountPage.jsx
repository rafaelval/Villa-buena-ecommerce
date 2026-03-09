import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import "./AccountPage.css";

export const AccountPage = () => {
  const shipping = useUserStore((state) => state.shipping);
  const setShipping = useUserStore((state) => state.setShipping);
  const payment = useUserStore((state) => state.payment);
  const setPayment = useUserStore((state) => state.setPayment);
  const [saved, setSaved] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated || !user)
    return <p>Please log in to view your account.</p>;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping({ [name]: value });
    setSaved(false);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").substring(0, 16);
      formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    if (name === "expiryDate") {
      const digits = value.replace(/\D/g, "").substring(0, 4);
      formatted =
        digits.length > 2
          ? `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
          : digits;
    }
    if (name === "cvc") {
      formatted = value.replace(/\D/g, "").substring(0, 3);
    }

    setPayment({ [name]: formatted });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container account-container">
      <h2 className="account-title">Account Information</h2>

      <div className="account-card">
        <div className="account-profile-header">
          <img src={user.picture} alt="profile" className="account-avatar" />
          <div>
            <p className="account-auth-name">{user.name}</p>
            <p className="account-auth-email">{user.email}</p>
          </div>
        </div>

        <hr className="account-divider" />

        <form onSubmit={handleSubmit} className="account-form">
          <p className="account-section-title">Shipping</p>

          <div className="account-form-group">
            <label className="account-label">Full Name</label>
            <input
              name="fullName"
              className="form-control account-input"
              value={shipping.fullName}
              onChange={handleShippingChange}
              placeholder="Your full name"
            />
          </div>

          <div className="account-form-group">
            <label className="account-label">Address</label>
            <input
              name="address"
              className="form-control account-input"
              value={shipping.address}
              onChange={handleShippingChange}
              placeholder="Your address"
            />
          </div>

          <div className="account-form-group">
            <label className="account-label">City</label>
            <input
              name="city"
              className="form-control account-input"
              value={shipping.city}
              onChange={handleShippingChange}
              placeholder="Your city"
            />
          </div>

          <hr className="account-divider" />

          <p className="account-section-title">Payment</p>

          <div className="account-form-group">
            <label className="account-label">Card Number</label>
            <input
              name="cardNumber"
              className="form-control account-input"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="account-form-row">
            <div className="account-form-group">
              <label className="account-label">Expiry Date</label>
              <input
                name="expiryDate"
                className="form-control account-input"
                value={payment.expiryDate}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
              />
            </div>

            <div className="account-form-group">
              <label className="account-label">CVC</label>
              <input
                name="cvc"
                className="form-control account-input"
                value={payment.cvc}
                onChange={handlePaymentChange}
                placeholder="123"
              />
            </div>
          </div>

          <button type="submit" className="account-save-btn">
            {saved ? "✓ Saved" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
