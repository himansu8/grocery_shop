import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/serach';
import { CartProvider } from './context/cart';
import { WishlistProvider } from './context/wishlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </SearchProvider>
  </AuthProvider>

);


