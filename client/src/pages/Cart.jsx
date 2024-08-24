import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Layout from '../Components/layout/Layout';
import { useCart } from '../context/cart';
import { Link } from 'react-router-dom'; // Make sure to import Link for navigation

const Cart = () => {
  const [cart, setCart] = useCart();

  // Initialize quantityInCart if not already initialized
  const initializeCartItem = (item) => ({
    ...item,
    quantityInCart: item.quantityInCart || 1,
  });

  const initializedCart = cart.map(initializeCartItem);

  // Update cart and localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle item removal
  const handleRemove = (id) => {
    const updatedCart = initializedCart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = initializedCart.map((item) =>
      item._id === id
        ? { ...item, quantityInCart: Math.max(1, Math.min(newQuantity, item.quantity)) }
        : item
    );
    updateCart(updatedCart);
  };

  // Calculate total amount
  const total = initializedCart.reduce(
    (acc, item) => acc + item.price * (item.quantityInCart || 0),
    0
  );

  return (
    <Layout>
      <div className="max-w-screen-2xl container mx-auto  xl:px-28 px-4 mt-32 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-8 bg-white shadow-lg rounded-lg p-6">
            {initializedCart.length === 0 ? ( 
              <div className="text-center p-8">
                <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
                <p className="text-gray-600 mb-4">It looks like you haven't added any products to your cart yet.</p>
                <p className="text-gray-600 mb-4">Start shopping to add products to your cart.</p>
                <Link
                  to="/allproducts"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Click here to browse all products
                </Link>
              </div>
            ) : (
              initializedCart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between border-b py-6"
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg"
                  />
                  <div className="flex-grow md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                    <span className="text-lg font-medium text-gray-700">{item.name}</span>
                    <div className="mt-2 text-gray-600">
                      <span>Price: ₹{item.price}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-center md:justify-start">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantityInCart - 1)}
                        disabled={item.quantityInCart <= 1}
                        className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg font-medium">{item.quantityInCart}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantityInCart + 1)}
                        disabled={item.quantityInCart >= item.quantity} // Disable if quantity in cart exceeds available stock
                        className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    {item.quantityInCart >= item.quantity && (
                      <p className="text-red-500 text-sm mt-2">
                        Maximum stock available: {item.quantity}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center mt-4 md:mt-0">
                    <span className="text-lg font-semibold text-gray-800">₹{item.price * item.quantityInCart}</span>
                    <TrashIcon
                      className="w-6 h-6 text-red cursor-pointer hover:text-[#8B0000] mt-2"
                      onClick={() => handleRemove(item._id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Price Details</h2>
            <div className="flex justify-between mb-4 text-lg text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-4 text-lg text-gray-600">
              <span>Tax (18%)</span>
              <span>₹{(total * 0.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold border-t pt-4 text-gray-800">
              <span>Total Amount</span>
              <span>₹{(total * 1.18).toFixed(2)}</span>
            </div>
            <button className="w-full mt-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
