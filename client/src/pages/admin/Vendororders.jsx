import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import AdminSidebar from '../../Components/layout/AdminSidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

function VendorOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useAuth();
    const [filterStatus, setFilterStatus] = useState('All');
    const [vendorDetails, setVendorDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/allOrdersOfVendor`, {
                    headers: {
                        authorization: auth?.token,
                    },
                });
                if (response.data.success) {
                    setOrders(response.data.orders || []); 
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

    const fetchVendorDetails = async (vendorId) => {
        try {
            if (!vendorDetails[vendorId]) {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/vendor/single/${vendorId}`, {
                    headers: {
                        authorization: auth?.token,
                    },
                });
                if (response.data.success) {
                    setVendorDetails((prevDetails) => ({
                        ...prevDetails,
                        [vendorId]: response.data.vendor,
                    }));
                    setSelectedVendor(response.data.vendor);
                    setShowModal(true);
                } else {
                    toast.error('Failed to fetch vendor details');
                }
            } else {
                setSelectedVendor(vendorDetails[vendorId]);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error fetching vendor details:', error);
            toast.error('Something went wrong while fetching vendor details!');
        }
    };

    const calculateDaysPassed = (createdAt) => {
        const orderDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInTime = currentDate - orderDate;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    // Sort the orders by createdAt date in descending order (newest first)
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filteredOrders = filterStatus === 'All'
        ? sortedOrders // Apply the sorting here
        : sortedOrders.filter(order => order.status === filterStatus);

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    <div className="w-full md:w-9/12 mt-6 md:mt-0">
                        <div className="md:p-4">
                            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h1 className="text-2xl font-semibold mb-4">Orders</h1>

                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {['All', 'Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <button
                                                key={status}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                                    filterStatus === status ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                                onClick={() => setFilterStatus(status)}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>

                                    {loading ? (
                                        <p>Loading orders...</p>
                                    ) : error ? (
                                        <p className="text-red-500">{error}</p>
                                    ) : filteredOrders.length === 0 ? (
                                        <p>No orders found.</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Passed</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredOrders.map((order) => (
                                                        <tr key={order._id}>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ₹{order.payment?.amount || 'N/A'}
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.status || 'Unknown'}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {calculateDaysPassed(order.createdAt)} days ago
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <button
                                                                    onClick={() => fetchVendorDetails(order.products[0].owner)}
                                                                    className="text-blue-500 hover:underline"
                                                                >
                                                                    View Seller Details
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
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">Seller Details</h2>
                        {selectedVendor ? (
                            <div>
                                <p><strong>Name:</strong> {selectedVendor.name}</p>
                                <p><strong>Email:</strong> {selectedVendor.email}</p>
                                <p><strong>Phone:</strong> {selectedVendor.phone}</p>
                            </div>
                        ) : (
                            <p>Loading seller details...</p>
                        )}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default VendorOrders;
