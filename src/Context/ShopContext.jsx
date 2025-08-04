import React, { createContext, useContext } from 'react'

const ShopContext = createContext();

export const useShop = () => {
  return useContext(ShopContext);
}

export default ShopContext