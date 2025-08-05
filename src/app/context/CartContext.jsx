"use client";

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // TAMBAHAN: update quantity jika produk sudah ada
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }
    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
  };

  // FUNGSI BARU UNTUK MENGHAPUS ITEM
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // ✅ TAMBAHAN: Fungsi untuk tambah jumlah
  const increaseQty = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ TAMBAHAN: Fungsi untuk kurang jumlah
  const decreaseQty = (productId) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    // TAMBAHKAN removeFromCart KE DALAM VALUE
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
