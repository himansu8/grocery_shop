import React, { useEffect, useState } from 'react'
import Layout from '../../Components/layout/Layout'
import VendorSidebar from '../../Components/layout/VendorSidebar'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import ProductCard from '../../Components/layout/ProductCard';

function CloneproductPage() {
    const [auth] = useAuth();
    const [products, setProducts] = useState([]);
    // Get products based on the view

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product//vendor-products`, {
                headers: {
                    authorization: auth?.token,
                },
            });
            setProducts(data.products);

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
    // const ownerName = products
    // console.log(ownerName)
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
                        <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">Clone Products</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} basePath="/vendor/clone" name="clone"/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CloneproductPage