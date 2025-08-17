import React, { createContext, useState, useEffect } from "react";
import all_product from "./../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  // Try to get cart from localStorage first
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error parsing saved cart:", error);
    }
  }
  return {};
};

const getAuthState = () => {
  // Try to get auth state from localStorage
  const savedAuth = localStorage.getItem("userAuth");
  if (savedAuth) {
    try {
      return JSON.parse(savedAuth);
    } catch (error) {
      console.error("Error parsing saved auth:", error);
    }
  }
  return { isLoggedIn: false, user: null };
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [authState, setAuthState] = useState(getAuthState());

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userAuth", JSON.stringify(authState));
  }, [authState]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] = newCart[itemId] - 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] = newCart[itemId] - 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const removeItemCompletely = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  // Authentication functions
  const login = (userData) => {
    setAuthState({
      isLoggedIn: true,
      user: userData,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
  };

  const updateUser = (updatedUserData) => {
    setAuthState((prev) => ({
      ...prev,
      user: { ...prev.user, ...updatedUserData },
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemCompletely,
    clearCart,
    // Authentication
    isLoggedIn: authState.isLoggedIn,
    user: authState.user,
    login,
    logout,
    updateUser,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
