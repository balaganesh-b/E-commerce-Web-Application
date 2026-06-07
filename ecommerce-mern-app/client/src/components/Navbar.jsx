import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MERN Shop</Link>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/cart">
          Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
