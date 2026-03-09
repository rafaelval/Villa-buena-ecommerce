import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useCartStore } from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";
import { strings } from "../../utils/strings";

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = useUIStore();

  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const s = strings

  return (
    <>
      {/* overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCart}
      />

      {/* drawer */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        {/* header */}

        <div className="cart-header">
          <h5>{s.shopping} ({totalItems})</h5>

          <button onClick={closeCart} className="cart-close">
            <X size={20} />
          </button>
        </div>

        {/* items */}

        <div className="cart-items">
          {cart.length === 0 && (
            <div className="cart-empty">{s.empty}</div>
          )}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} className="cart-item-img" />

              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>

                <div className="cart-item-price">${item.price}</div>

                <div className="cart-item-controls">
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}><Minus size={20}/></button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}><Plus size={20}/></button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}

        <div className="cart-footer">
          <div className="cart-total">
            <span>{s.total}</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => {
              closeCart();
              navigate("/checkout/shipping");
            }}
          >
            {s.checkout}
          </button>

          <button
            className="view-cart-btn"
            onClick={() => {
              closeCart();
              navigate("/cart");
            }}
          >
            {s.viewCart}
          </button>
        </div>
      </div>
    </>
  );
};
