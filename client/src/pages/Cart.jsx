import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Layout from '../Components/layout/Layout';
import { useCart } from '../context/cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import Swal from 'sweetalert2';

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0); // State for current address index
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
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
        setLoading(false);
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

  // Handle Next and Previous Address
  const handleNextAddress = () => {
    if (currentAddressIndex < addresses.length - 1) {
      setCurrentAddressIndex(currentAddressIndex + 1);
    }
  };

  const handlePreviousAddress = () => {
    if (currentAddressIndex > 0) {
      setCurrentAddressIndex(currentAddressIndex - 1);
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 lg:mt-32 mt-36 mb-8">
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
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="ml-24 p-2 text-red hover:text-red-800 "
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Address Selection Section */}
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading addresses...</div>
            ) : (
              <div className="flex flex-col max-h-96 overflow-y-auto border border-gray-300 rounded-lg mb-4">
                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-center">No addresses found.</p>
                ) : (
                  <div>
                    <div
                      key={addresses[currentAddressIndex]._id}
                      className={`p-4 border-b cursor-pointer ${
                        selectedAddress?._id === addresses[currentAddressIndex]._id ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(addresses[currentAddressIndex])}
                    >
                      <p className="font-medium">{addresses[currentAddressIndex].name}</p>
                      <p>{addresses[currentAddressIndex].mobile}</p>
                      <p>{addresses[currentAddressIndex].street}</p>
                      <p>{addresses[currentAddressIndex].city}, {addresses[currentAddressIndex].state} - {addresses[currentAddressIndex].pincode}</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePreviousAddress}
                        disabled={currentAddressIndex === 0}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextAddress}
                        disabled={currentAddressIndex === addresses.length - 1}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedAddress && (
              <div className="p-4 border rounded-lg bg-blue-100 border-blue-500">
                <h3 className="font-medium">Selected Address</h3>
                <p>{selectedAddress.name}</p>
                <p>{selectedAddress.mobile}</p>
                <p>{selectedAddress.street}</p>
                <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Total and Payment Button */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-semibold">₹{total}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
