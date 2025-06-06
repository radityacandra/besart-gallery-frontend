import * as React from "react"

const OrderContext = React.createContext(null)

export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = React.useState(null)

  return (
    <OrderContext.Provider value={{ orderId, setOrderId }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => React.useContext(OrderContext);
