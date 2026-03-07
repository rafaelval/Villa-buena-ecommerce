import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useUIStore } from "../../store/uiStore";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import "./Navbar.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const { darkMode, toggleDarkMode, openCart } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="container d-flex justify-content-between align-items-center py-1">
        
        <Link to="/" className="navbar-logo">
          <img
            src="/logo.png"
            alt="Villa Buena"
          />
        </Link>

        <div className="d-flex align-items-center gap-3">
          
          <button 
            className="navbar-cart-button" 
            onClick={openCart}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="navbar-cart-badge">
                {totalItems}
              </span>
            )}
          </button>

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