import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useUIStore } from "../../store/uiStore";
import { Sun, Moon, ShoppingCart, ChevronDown } from "lucide-react";
import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const logout = () => {
  localStorage.removeItem("user-checkout-storage");
  auth0Logout({ logoutParams: { returnTo: window.location.origin } });
};

  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode, openCart } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // cerrar el menu al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
      <div className="container d-flex justify-content-between align-items-center py-1">

        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Villa Buena" />
        </Link>

        {/* controles derecha */}
        <div className="d-flex align-items-center gap-3">

          <button
            className="navbar-cart-button"
            onClick={openCart}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="navbar-cart-badge">{totalItems}</span>
            )}
          </button>

          <button
            className="navbar-theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* zona de usuario */}
          <div className="navbar-user-wrapper" ref={menuRef}>
            {isLoading ? (
              <div className="navbar-user-skeleton" />
            ) : isAuthenticated ? (
              <>
                <button
                  className="navbar-user-trigger"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                >
                  <img
                    src={user?.picture}
                    alt="profile"
                    className="navbar-user-avatar"
                  />
                  <span className="navbar-user-name">{user?.given_name}</span>
                  <ChevronDown
                    size={12}
                    className={`navbar-user-chevron ${userMenuOpen ? "open" : ""}`}
                  />
                </button>

                {isAuthenticated && userMenuOpen && (
                  <div className="navbar-user-menu">
                    <Link
                      to="/account"
                      className="navbar-user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Account Information
                    </Link>
                    <Link
                      to="/orders"
                      className="navbar-user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      className="navbar-user-menu-item logout"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                {error && <p className="text-danger mb-0" style={{ fontSize: "0.75rem" }}>Error</p>}
                <button className="navbar-auth-btn" onClick={login}>
                  Login
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;