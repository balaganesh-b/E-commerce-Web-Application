import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <div className="card-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </Link>
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="card-category">{product.category}</div>
        <div className="card-price">₹{product.price}</div>
        <div className="card-actions">
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-secondary">View</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
