import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  //const [count, setCount] = useState(1);


  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  // Function to check if an item is already in the cart
  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  return (
    <CartContext.Provider value={[cart, setCart, isProductInCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };