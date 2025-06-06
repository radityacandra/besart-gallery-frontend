import * as React from 'react';
import { AuthProvider } from './src/context/auth-context';
import { CartProvider } from './src/context/cart-context';
import { OrderProvider } from './src/context/order-context';

export const wrapRootElement = ({ element }) => (
  <AuthProvider><CartProvider><OrderProvider>{element}</OrderProvider></CartProvider></AuthProvider>
);
