import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';

function ProductModal({ isOpen, onClose, order }) {
    const [status, setStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);
    const [auth] = useAuth()
console.log(order)
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/order/updateOrder/${order._id}`,
                { status },
                {  headers: {
                    authorization: auth?.token,
                }, }
            );
            if (response.data.success) {
                toast.success('Order status updated successfully');
                onClose(); // Close modal after successful update
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Something went wrong while updating the status!');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;
console.log(order)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg z-10">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                    <div>
                        <img src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${order.products[0]?.productId._id}`} alt={order.products[0]?.name} className="w-32 h-auto  mb-4" />
                        <p className="text-md font-medium mb-2">Product Name: {order.products[0]?.name}</p>
                        <p className="text-md mb-2">Description: {order.products[0]?.description}</p>
                        <p className="text-md mb-4">Price: ₹{order.products[0]?.price}</p>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={handleStatusChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="Not Processed">Not Processed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`text-white ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} py-2 px-4 rounded-md`}
                            >
                                {loading ? 'Updating...' : 'Submit'}
                            </button>
                            <button
                                onClick={onClose}
                                className="text-white bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
