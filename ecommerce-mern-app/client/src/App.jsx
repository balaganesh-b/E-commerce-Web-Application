import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { useEffect, useState } from "react";
import { getProducts, getProductById } from "./api.js";
import { useParams } from "react-router-dom";
import { useCart } from "./context/CartContext.jsx";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Make sure backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Latest Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="page"><p>Loading product...</p></div>;
  if (error) return <div className="page"><p className="error-text">{error}</p></div>;
  if (!product) return <div className="page"><p>Product not found.</p></div>;

  return (
    <div className="page product-detail">
      <div className="product-detail-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  return (
    <div className="page">
      <h1 className="page-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ₹{totalPrice}</p>
            <button className="btn btn-primary" disabled>
              Checkout (Demo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
