// NewlyAddedProduct.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Components/layout/Layout';
import ProductCard from '../Components/layout/ProductCard';

function NewlyAddedProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchNewProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/newlyadded`);
                setProducts(response.data); // Directly setting the product array
            } catch (error) {
                console.error('Error fetching new items:', error);
            }
        };

        fetchNewProduct();
    }, []);

    return (
        <Layout>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 lg:mt-28 mt-36 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] '>
                <div className='flex items-center justify-between mb-6 px-4'>
                    <h2 className='text-3xl font-bold'>Newly Added Products</h2>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8'>
                    {Array.isArray(products) && products.map(product => (
                        <div key={product.id}>
                            <ProductCard product={product} basePath="/single" />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default NewlyAddedProduct;
