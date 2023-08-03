import { createContext, useState } from "react";

const CartCountContext = createContext();

export const CartCountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};

export default CartCountContext;
