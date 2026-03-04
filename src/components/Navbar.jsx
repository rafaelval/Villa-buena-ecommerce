import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useUIStore } from "../store/uiStore";
import { Sun, Moon, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode } = useUIStore();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar-custom">
      <div className="container d-flex justify-content-between align-items-center py-1">
        <Link to="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Villa Buena"
            style={{
              height: "85px",
              maskImage: "radial-gradient(circle, black 80%, transparent 100%)",
            }}
          />
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="cart-button">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
