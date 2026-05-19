import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const data = await AsyncStorage.getItem('carts');
      const parsedData = data ? JSON.parse(data) : [];
      setCarts(parsedData);
    } catch (error) {
      console.log('Load cart error:', error);
    }
  };

  const addToCart = async item => {
    try {
      let updatedCart;

      const exists = carts.find(cart => cart.id === item.id);

      if (exists) {
        updatedCart = carts.map(cart =>
          cart.id === item.id ? { ...cart, qty: cart.qty + 1 } : cart,
        );
      } else {
        updatedCart = [...carts, { ...item, qty: 1 }];
      }

      setCarts(updatedCart);
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Add to cart error:', error);
    }
  };

  const decreaseQty = async id => {
    try {
      const updatedCart = carts
        .map(item => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter(item => item.qty > 0); // remove if qty = 0

      setCarts(updatedCart);
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Decrease qty error:', error);
    }
  };

  const removeFromCart = async id => {
    try {
      const updatedCart = carts.filter(item => item.id !== id);

      setCarts(updatedCart);
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Remove item error:', error);
    }
  };

  const clearCart = async () => {
    try {
      setCarts([]);
      await AsyncStorage.removeItem('carts');
    } catch (error) {
      console.log('Clear cart error:', error);
    }
  };

  const getTotal = () => {
    return carts.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
