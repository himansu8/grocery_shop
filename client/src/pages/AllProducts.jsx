import React, { useEffect, useState } from 'react';
import Layout from '../Components/layout/Layout';
import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import ProductCard from '../Components/layout/ProductCard';
import { toast } from 'react-toastify';
import { Prices } from '../Components/form/Prices';

function AllProducts() {
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState(false); // Track if filters are applied
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/all-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while fetching products');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length && !radio.length) {
            getAllProducts();
            setFiltered(false); // No filters applied
        }
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProduct();
            setFiltered(true); // Filters applied
        }
    }, [checked, radio]);

    // Get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/product/product-filters`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Get current products for pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24 mb-8">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar (Responsive) */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <div className="bg-white shadow-xl rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-4 text-center text-gray-800 border-b border-gray-300 pb-2">Filter By Category</h4>
                            <div className="flex flex-col space-y-3">
                                {categories?.map((c) => (
                                    <Checkbox
                                        key={c._id}
                                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                                        className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 ease-in-out"
                                    >
                                        {c.name}
                                    </Checkbox>
                                ))}
                            </div>
                            {/* Price filter */}
                            <h4 className="text-xl font-bold mt-8 mb-4 text-center text-gray-800 border-b border-gray-300 pb-2">Filter By Price</h4>
                            <div className="flex flex-col space-y-3">
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map((p) => (
                                        <div key={p._id} className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 ease-in-out">
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                            <div className="flex justify-center mt-8">
                                <button
                                    className="w-full bg-red py-3 rounded-lg text-white hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                                    onClick={() => window.location.reload()}
                                >
                                    RESET FILTERS
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Responsive) */}
                    <div className="w-full md:w-9/12 mt-6 md:mt-0 md:p-4 bg-white rounded-lg shadow-lg">
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 mt-2 text-center">All Products</h1>

                        {/* Show no products message if the products array is empty */}
                        {filtered && products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full -mt-16">
                                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                                    <p className="text-4xl font-bold text-indigo-600 mb-4">Oops!</p>
                                    <p className="text-2xl text-gray-800 mb-2">No Products Found</p>
                                    <p className="text-md text-gray-600">Try adjusting your filters or explore other categories.</p>
                                </div>
                                <svg
                                    className="mt-8 w-24 h-24 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 13h6m2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 11-4 0m4 0v6m-4 6H5a2 2 0 01-2-2V9l7-7h4l7 7v10a2 2 0 01-2 2h-4v-6m-4 6H5a2 2 0 01-2-2V9l7-7h4l7 7v10a2 2 0 01-2 2h-4v-6z"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {currentProducts?.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination controls */}
                        {products.length > itemsPerPage && (
                            <div className="flex justify-center mt-8 flex-wrap">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`mx-1 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-green text-white' : 'bg-white text-black'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AllProducts;
