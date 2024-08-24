import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Layout from '../../Components/layout/Layout';
import AdminSidebar from '../../Components/layout/AdminSidebar';
import { useAuth } from '../../context/auth';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductApproval = () => {
    const [auth] = useAuth();
    const [pendingProducts, setPendingProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Fetch pending products
    const fetchPendingProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/products/pending`, {
                headers: {
                    authorization: auth?.token,
                },
            });
            console.log(data)
            setPendingProducts(data.products);
        } catch (error) {
            console.error('Error fetching pending products:', error);
        }
    };

    // Handle approval
    const handleApprove = async (productId) => {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/product/${productId}/approve`, {}, {
                headers: {
                    authorization: auth?.token,
                },
            });
            fetchPendingProducts(); // Refresh the list
            toast.success("Successfully Approved ")
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error approving product:', error);
        }
    };

    // Handle rejection
    const handleReject = async (productId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/product/reject/${productId}`, {
                headers: {
                    authorization: auth?.token,
                },
            });
            fetchPendingProducts(); // Refresh the list
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
    };

    useEffect(() => {
        fetchPendingProducts();
    }, []);
    console.log(selectedProduct)
    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar (Responsive) */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    {/* Main Content (Responsive) */}
                    <div className="w-full md:w-9/12 mt-6 md:mt-0">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border mt-12 border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Product Name</th>
                                        <th className="py-2 px-4 border-b">Category</th>
                                        <th className="py-2 px-4 border-b">Price</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td className="py-2 px-4 border-b">{product.name}</td>
                                            <td className="py-2 px-4 border-b">{product.category.name}</td>
                                            <td className="py-2 px-4 border-b">${product.price}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setModalIsOpen(true);
                                                    }}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Product Details"
                    className="bg-white p-6 rounded-lg w-full md:w-3/5 mx-auto mt-24 shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    {selectedProduct && (
                        <div className="flex flex-col md:flex-row">
                            {/* Left Side: Content */}
                            <div className="md:w-2/3 pr-0 md:pr-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
                                <p className="text-gray-700 mb-2">
                                    <strong>Name:</strong> {selectedProduct.name}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Description:</strong> {selectedProduct.description}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Price:</strong> ${selectedProduct.price}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <strong>Category:</strong> {selectedProduct.category.name}
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => handleApprove(selectedProduct._id)}
                                        className="bg-green text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300"
                                    >
                                        <FaCheckCircle />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(selectedProduct._id)}
                                        className="bg-red text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition duration-300"
                                    >
                                        <FaTimesCircle />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => setModalIsOpen(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-700 transition duration-300"
                                    >
                                        <FaTimes />
                                        Close
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Image */}
                            <div className="md:w-1/3 mt-6 md:mt-0">
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${selectedProduct._id}`}
                                    alt={selectedProduct.name}
                                    className="w-full h-48 md:h-auto object-cover rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    )}
                </Modal>



            </div>
        </Layout>
    );
};

export default ProductApproval;
