import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import axios from 'axios';
import ProductCard from '../../Components/layout/ProductCard';
import { useAuth } from '../../context/auth';
import VendorSidebar from '../../Components/layout/VendorSidebar';

function VendorProducts() {
    const [auth] = useAuth();
    const [products, setProducts] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);
    const [view, setView] = useState('approved'); // 'approved' or 'pending'

    // Get products based on the view
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/vendor/products`, {
                headers: {
                    authorization: auth?.token,
                },
            });
            setProducts(data.products.filter(product => product.approved === true));
            setPendingProducts(data.products.filter(product => product.approved === false));
            
            // Scroll to top after fetching products
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong while fetching products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar (Responsive) */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <VendorSidebar />
                    </div>
                    {/* Main Content (Responsive) */}
                    <div className="w-full md:w-9/12 mt-6 md:mt-0 md:p-4 bg-white rounded-lg">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">Your Products</h1>
                        {/* View Controls */}
                        <div className="mb-4 text-center">
                            <button
                                onClick={() => setView('approved')}
                                className={`px-4 py-2 font-semibold rounded ${view === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Approved Products
                            </button>
                            <button
                                onClick={() => setView('pending')}
                                className={`px-4 py-2 font-semibold rounded ${view === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Pending Products
                            </button>
                        </div>
                        {view === 'approved' ? (
                            products.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} basePath="/vendor" />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center mt-12">
                                    <p className="text-lg text-gray-600 mb-4">No approved products to display.</p>
                                </div>
                            )
                        ) : (
                            pendingProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {pendingProducts.map(product => (
                                        <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            <ProductCard product={product} basePath="/vendor" />
                                            <div className="mt-4 text-center text-gray-600">
                                                <p className="text-sm">Your product is pending approval.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center mt-12">
                                    <p className="text-lg text-gray-600 mb-4">No pending products to display.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VendorProducts;
