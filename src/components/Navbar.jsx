import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useUIStore } from "../store/uiStore";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode } = useUIStore();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container d-flex justify-content-between align-items-center">
        
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/logo.png"
            alt="DevStore logo"
            style={{ height: "65px" }}
          />
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}>
            Cart ({totalItems})
          </Link>

          <button
            className="btn btn-sm"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;