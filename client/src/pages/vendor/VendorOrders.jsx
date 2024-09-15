import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import VendorSidebar from '../../Components/layout/VendorSidebar';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductModal from '../../Components/ProductModal';

function VendorOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/allOrdersOfAnSeller`, {
                    headers: {
                        authorization: auth?.token,
                    },
                });
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Something went wrong while fetching orders!');
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [auth?.token]);

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar (Responsive) */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <VendorSidebar />
                    </div>
                    {/* Main Content */}
                    <div className="w-full md:w-9/12 mt-6 md:mt-0">
                        <div className="md:p-4">
                            {/* Orders Section */}
                            <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
                                <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                                {loading ? (
                                    <p className="text-gray-600">Loading orders...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : orders?.length === 0 ? (
                                    <p className="text-gray-600">No orders found.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {orders?.map((order) => (
                                                    <tr key={order._id}>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.payment?.amount || 'N/A'}</td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => handleViewClick(order)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedOrder && (
                <ProductModal isOpen={modalOpen} onClose={handleCloseModal} order={selectedOrder} />
            )}
        </Layout>
    );
}

export default VendorOrders;
