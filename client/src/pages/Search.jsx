import React, { useState } from 'react'
import { useSearch } from '../context/serach';
import Layout from '../Components/layout/Layout';
import ProductCard from '../Components/layout/ProductCard';

function Search() {
    const [values, setValues] = useSearch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    // Calculate indexes for pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = values?.results.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(values?.results.length / itemsPerPage);
    return (
        <Layout>
        <div className="min-h-screen bg-gray-50 py-8 sm:py-10 lg:mt-24 mt-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Search Results</h1>
                    <h6 className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-600">
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length} ${values?.results.length > 1 ? 'products' : 'product'}`}
                    </h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentProducts?.map((product) => (
                        <ProductCard key={product._id} product={product} basePath="/single" />
                    ))}
                </div>

                {/* Pagination controls */}
                {values?.results.length > itemsPerPage && (
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
    </Layout>

    )
}

export default Search