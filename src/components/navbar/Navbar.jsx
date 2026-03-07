import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useUIStore } from "../../store/uiStore";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode, openCart } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
      <div className="container d-flex justify-content-between align-items-center py-1">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Villa Buena" />
        </Link>

        {/* Controles derecha */}
        <div className="d-flex align-items-center gap-3">

          {/* Auth0 */}
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-2">
              <span className="navbar-user-name">Hola, {user.given_name}</span>
              <button className="navbar-auth-btn navbar-auth-btn--outline" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              {error && <p className="text-danger mb-0">Error: {error.message}</p>}
              <button className="navbar-auth-btn" onClick={login}>
                Login
              </button>
            </div>
          )}

          {/* Carrito */}
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

          {/* Tema */}
          <button
            className="navbar-theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;