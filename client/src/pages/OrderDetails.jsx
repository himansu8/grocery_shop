import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../Components/layout/Layout';


const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <Layout>
        <div className="max-w-screen-xl mx-auto text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-800">
            No order details available.
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto py-20">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Order Summary</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-6 text-gray-800">Order ID: {order._id}</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-600">Products:</h3>
            {order.products.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantityInCart})</span>
                <span>₹{item.price * item.quantityInCart}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-semibold border-t pt-4 text-gray-800">
            <span>Total Amount Paid:</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <div className="mt-4 text-lg text-gray-600">
            Payment Status: <span className="font-medium">{order.paymentStatus}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
