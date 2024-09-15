import axios from 'axios';
import { useState } from 'react';

const OrderPage = () => {
  const [orderData, setOrderData] = useState({
    products: [
      { productId: '60f07d33b6394b08f0d62ef8', quantity: 2 },
      { productId: '60f07d33b6394b08f0d62ef9', quantity: 1 }
    ],
    payment: {
      method: 'credit card',
      transactionId: 'txn_123456789'
    },
    buyer: '60f07c8cb6394b08f0d62ef6'
  });

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/order/create', orderData);
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Order Page</h1>
      <button onClick={createOrder}>Place Order</button>
    </div>
  );
};

export default OrderPage;
