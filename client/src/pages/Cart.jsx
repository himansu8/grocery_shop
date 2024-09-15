import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Layout from '../Components/layout/Layout';
import { useCart } from '../context/cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests
import { useAuth } from '../context/auth';
import Swal from 'sweetalert2';

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after payment
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/address/all/user`, {
          headers: {
            authorization: auth?.token,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch addresses. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchAddresses();
  }, [auth]);

  const initializeCartItem = (item) => ({
    ...item,
    quantityInCart: item.quantityInCart || 1,
  });

  const initializedCart = cart.map(initializeCartItem);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = initializedCart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = initializedCart.map((item) =>
      item._id === id
        ? { ...item, quantityInCart: Math.max(1, Math.min(newQuantity, item.quantity)) }
        : item
    );
    updateCart(updatedCart);
  };

  const total = initializedCart.reduce(
    (acc, item) => acc + item.price * (item.quantityInCart || 0),
    0
  );

  const handlePayment = async () => {
    if (!auth?.user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!selectedAddress) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select an address before proceeding.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      const amount = Math.round(total);
      if (!amount) {
        console.error("Amount is undefined or invalid.");
        return;
      }

      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/payment/create`, { amount });

      if (!data || !data.order || !data.order.id) {
        console.error("Payment order data is undefined or invalid.");
        return;
      }

      const { id: order_id } = data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        order_id: order_id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const { data: verifyResponse } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/payment/verify`, paymentData);

          if (verifyResponse.success) {
            const orderData = {
              products: initializedCart.map(item => ({
                productId: item._id,
                quantity: item.quantityInCart,
                price: item.price,
              })),
              payment: {
                transactionId: response.razorpay_payment_id,
                method: "Razorpay",
                amount,
                status: 'Paid'
              },
              buyer: auth?.user?._id,
              address: selectedAddress,
            };

            const { data: orderResponse } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/create`, orderData);

            if (orderResponse.success) {
              updateCart([]);
              localStorage.removeItem('cart');

              Swal.fire({
                title: 'Success!',
                text: 'Your order has been placed successfully.',
                icon: 'success',
                confirmButtonText: 'View Order',
                confirmButtonColor: '#3085d6',
                backdrop: `rgba(0, 123, 255, 0.4) url("https://sweetalert2.github.io/images/nyan-cat.gif") left top no-repeat`,
              }).then(() => {
                navigate("/");
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Order creation failed. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Payment verification failed.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error: ", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error processing your payment.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mt-32 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-8 bg-white shadow-lg rounded-lg p-6">
            {initializedCart.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
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
                        disabled={item.quantityInCart >= item.quantity}
                        className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
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
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-700">
              <span>Total Items:</span>
              <span>{initializedCart.length}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-700">
              <span>Total Price:</span>
              <span>₹{total}</span>
            </div>

            {/* Address Selection */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Select Address:</label>
              <select
                id="address"
                value={selectedAddress || ''}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select an address</option>
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePayment}
              className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
