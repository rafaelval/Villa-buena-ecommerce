import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useUIStore } from "../store/uiStore";
import { Sun, Moon, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode } = useUIStore();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav
  className="navbar"
  style={{
    backgroundColor: "var(--color-primary)",
  }}
>
  <div className="container d-flex justify-content-between align-items-center py-3">

    <Link to="/" className="d-flex align-items-center">
      <img src="/logo.png" alt="Villa Buena" style={{ height: "55px" }} />
    </Link>

    <div className="d-flex align-items-center gap-3">

      <Link
        to="/cart"
        className="btn btn-outline-custom d-flex align-items-center gap-2"
      >
        <ShoppingCart size={18} />
        {totalItems}
      </Link>

      <button
        className="btn"
        style={{ color: "white" }}
        onClick={toggleDarkMode}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

    </div>
  </div>
</nav>
  );
};

export default Navbar;
