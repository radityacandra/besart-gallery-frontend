import * as React from "react"

const CartContext = React.createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState([])

  const addCartItems = (product) => {
    const existingProduct = cartItems.filter((item) => item.id === product.id)
    if (existingProduct === null || existingProduct.length === 0) {
      setCartItems([...cartItems, product])
    }
  }

  const clearCartItems = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addCartItems, clearCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);