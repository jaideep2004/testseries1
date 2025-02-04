//src/components/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
// import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from local storage, but filter by content type
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${user?._id}`);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Optionally filter cart items based on user role or content type
      setCart(parsedCart);
    }
    setLoading(false);
  }, [user?._id]);

  const saveCart = (newCart) => {
    if (user?._id) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(newCart));
    }
    setCart(newCart);
  };

  const addToCart = (content) => {
    if (!cart.some((item) => item._id === content._id)) {
      const newCart = [...cart, content];
      saveCart(newCart);
    }
  };

  const removeFromCart = (contentId) => {
    const newCart = cart.filter((item) => item._id !== contentId);
    saveCart(newCart);
  };

  const clearCart = () => {
    if (user?._id) {
      localStorage.removeItem(`cart_${user._id}`);
    }
    setCart([]);
  };

  const createBulkOrder = async () => {
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
      const { data } = await api.post("/payment/create-bulk-order", {
        items: cart.map((item) => ({
          contentId: item._id,
          price: item.price
        })),
        amount: totalAmount,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to create bulk order");
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    createBulkOrder,
    cartTotal: cart.reduce((sum, item) => sum + item.price, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};