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

  const addToCart = (itemId, size = "M") => {
    const cartKey = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId, size = null) => {
    if (size) {
      const cartKey = `${itemId}_${size}`;
      setCartItems((prev) => {
        const newCart = { ...prev };
        if (newCart[cartKey] > 1) {
          newCart[cartKey] = newCart[cartKey] - 1;
        } else {
          delete newCart[cartKey];
        }
        return newCart;
      });
    } else {
      // Remove all sizes of this item
      setCartItems((prev) => {
        const newCart = { ...prev };
        Object.keys(newCart).forEach((key) => {
          if (key.startsWith(`${itemId}_`)) {
            delete newCart[key];
          }
        });
        return newCart;
      });
    }
  };

  const increaseQuantity = (itemId, size) => {
    const cartKey = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [cartKey]: (prev[cartKey] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId, size) => {
    const cartKey = `${itemId}_${size}`;
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[cartKey] > 1) {
        newCart[cartKey] = newCart[cartKey] - 1;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
  };

  const removeItemCompletely = (itemId, size = null) => {
    if (size) {
      const cartKey = `${itemId}_${size}`;
      setCartItems((prev) => {
        const newCart = { ...prev };
        delete newCart[cartKey];
        return newCart;
      });
    } else {
      // Remove all sizes of this item
      setCartItems((prev) => {
        const newCart = { ...prev };
        Object.keys(newCart).forEach((key) => {
          if (key.startsWith(`${itemId}_`)) {
            delete newCart[key];
          }
        });
        return newCart;
      });
    }
  };

  const clearCart = () => {
    setCartItems({});
  };

  // Helper function to get cart items with size information
  const getCartItemsWithSizes = () => {
    const cartItemsArray = [];

    Object.keys(cartItems).forEach((cartKey) => {
      if (cartItems[cartKey] > 0) {
        const [itemId, size] = cartKey.split("_");
        const product = all_product.find((p) => p.id === Number(itemId));

        if (product) {
          cartItemsArray.push({
            ...product,
            size: size,
            quantity: cartItems[cartKey],
            cartKey: cartKey,
          });
        }
      }
    });

    return cartItemsArray;
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
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [itemId] = cartKey.split("_");
        let itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[cartKey];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        totalItem += cartItems[cartKey];
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
    getCartItemsWithSizes,
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
