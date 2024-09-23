import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import UserSidebar from '../../Components/layout/UserSidebar';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTruck, FaFileInvoice } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [showTracking, setShowTracking] = useState(false);
    const [addresses, setAddresses] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/allOrdersOfAnUser`, {
                    headers: {
                        authorization: auth?.token,
                    },
                });

                if (response.data.success) {
                    setOrders(response.data.orders);
                    
                    // Fetch addresses only for existing orders
                    const addressPromises = response.data.orders.map(order => 
                        axios.get(`${process.env.REACT_APP_BASE_URL}/api/address/single/user/${order.address}`, {
                            headers: {
                                authorization: auth?.token,
                            },
                        }).then(res => ({ [order.address]: res.data }))
                        .catch(error => {
                            if (error.response && error.response.status === 404) {
                                console.warn(`Address ${order.address} not found`);
                                return { [order.address]: null }; // handle not found address
                            }
                            throw error; // rethrow other errors
                        })
                    );

                    const addressesArray = await Promise.all(addressPromises);
                    const addressesObject = addressesArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                    setAddresses(addressesObject);

                } else {
                    toast.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Something went wrong while fetching orders!');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [auth]);

    const handleDownloadInvoice = (order) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Invoice", 14, 20);

        doc.setFontSize(12);
        doc.text(`Order ID: ${order._id}`, 14, 30);
        doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 40);
        doc.text(`Transaction ID: ${order.payment.transactionId}`, 14, 50);
        doc.text(`Payment Method: ${order.payment.method}`, 14, 60);
        doc.text(`Total Amount: ₹${order.payment.amount}`, 14, 70);

        const products = order.products.map((product) => [
            product.name,
            product.quantity,
            `₹${product.price}`,
        ]);

        doc.autoTable({
            head: [['Product', 'Quantity', 'Price']],
            body: products,
            startY: 80,
        });

        doc.save(`invoice_${order._id}.pdf`);
    };

    const handleTrackOrder = async (order) => {
        setSelectedOrder(order);
        setShowTracking(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/singleorder/${order._id}`);
            setTrackingInfo(response.data);
        } catch (error) {
            console.error('Error fetching tracking info:', error);
            toast.error('Failed to fetch tracking information');
        }
    };

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-28">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 p-4 md:pr-8">
                        <UserSidebar />
                    </div>

                    <div className="w-full md:w-9/12 mt-8 md:mt-0">
                        <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 mb-8">
                            <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 text-center">My Orders</h1>
                            {loading ? (
                                <p className="text-center">Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <p className="text-center">No orders found.</p>
                            ) : (
                                orders.map((order) => (
                                    <div key={order._id} className="border rounded-lg p-4 md:p-6 mb-6 shadow-lg">
                                        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                                            <h2 className="text-xl font-semibold mb-2 md:mb-0">Order #{order._id}</h2>
                                            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-lg">
                                                {order.payment.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 mt-2">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

                                        {/* Address Information */}
                                        {addresses[order.address] ? (
                                            addresses[order.address] !== null && (
                                                <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow">
                                                    <h3 className="font-semibold mb-2">Shipping Address:</h3>
                                                    <p><strong>Name:</strong> {addresses[order.address].name}</p>
                                                    <p><strong>City:</strong> {addresses[order.address].city}</p>
                                                    <p><strong>State:</strong> {addresses[order.address].state}</p>
                                                    <p><strong>Zip Code:</strong> {addresses[order.address].postalCode}</p>
                                                    <p><strong>Country:</strong> {addresses[order.address].country}</p>
                                                </div>
                                            )
                                        ) : (
                                            <p className="mt-4 text-gray-500">Address information not available.</p>
                                        )}

                                        <div className="mt-4">
                                            <h3 className="font-semibold mb-2">Products:</h3>
                                            <ul className="space-y-4">
                                                {order.products.map((product) => (
                                                    <li key={product.productId} className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-md shadow">
                                                        <div className="flex items-center space-x-4">
                                                            <Link to={`/single/products/${product.slug}`}>
                                                                <img 
                                                                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product.productId}`} 
                                                                    alt={product.name} 
                                                                    className="w-16 h-16 object-cover rounded"
                                                                />
                                                            </Link>
                                                            <div>
                                                                <Link to={`/single/products/${product.slug}`}>
                                                                    <p className="font-medium text-blue-600 hover:underline">{product.name}</p>
                                                                </Link>
                                                                <p className="text-gray-500">Qty: {product.quantity} | Price: ₹{product.price}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="font-semibold mb-2">Payment Details:</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <p><strong>Transaction ID:</strong> {order.payment.transactionId}</p>
                                                <p><strong>Payment Method:</strong> {order.payment.method}</p>
                                                <p><strong>Total Amount:</strong> ₹{order.payment.amount}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
                                            <button
                                                onClick={() => handleTrackOrder(order)}
                                                className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                                            >
                                                <FaTruck className="mr-2" />
                                                Track Order
                                            </button>
                                            <button
                                                onClick={() => handleDownloadInvoice(order)}
                                                className="flex items-center justify-center px-4 py-2 bg-green text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 mt-4 md:mt-0"
                                            >
                                                <FaFileInvoice className="mr-2" />
                                                Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {showTracking && selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Tracking Information for Order #{selectedOrder._id}</h3>
                            {trackingInfo ? (
                                                    <div>
                                                        <p><strong>Status:</strong> {trackingInfo.order.status}</p>
                                                        <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                                                        {/* Add more tracking details as needed */}
                                                    </div>
                                                ) : (
                                                    <p>Loading tracking information...</p>
                                                )}
                            <button
                                onClick={() => setShowTracking(false)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Orders;
