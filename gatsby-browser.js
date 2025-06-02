import * as React from 'react';
import { AuthProvider } from './src/context/auth-context';
import { CartProvider } from './src/context/cart-context';

export const wrapRootElement = ({ element }) => (
  <AuthProvider><CartProvider>{element}</CartProvider></AuthProvider>
);
