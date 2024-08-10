

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../Components/layout/Layout';
import AdminSidebar from '../../Components/layout/AdminSidebar';
import ProductCard from '../../Components/layout/ProductCard';
import { Link } from 'react-router-dom';


function Products() {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/all-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching products");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar (Responsive) */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    {/* Main Content (Responsive) */}
                    <div className="w-full md:w-9/12 mt-6 md:mt-0 md:p-4 bg-white rounded-lg">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">All Products</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                            {products?.map(product => (
                                // <Link to={`/admin/products/${product.slug}`}> </Link>
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Products;
