import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          DevStore
        </Link>

        <Link to="/cart" className="btn btn-outline-light">
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
