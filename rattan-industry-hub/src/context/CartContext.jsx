import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('caneCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.color === product.color
      );
      const qtyToAdd = product.quantity || 1;

      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += qtyToAdd;
        return updatedItems;
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (productId, color) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && item.color === color)));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('caneCart');
  };

  const decreaseQuantity = (productId, color) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === productId && item.color === color) {
          return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
        }
        return item;
      });
    });
  };

  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('caneCart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      decreaseQuantity,
      getCartTotal, 
      getCartCount  
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);