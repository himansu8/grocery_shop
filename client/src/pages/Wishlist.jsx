import React from 'react';
import Layout from '../Components/layout/Layout';
import { useWishlist } from '../context/wishlist';
import ProductCard from '../Components/layout/ProductCard';
import { Link } from 'react-router-dom';

function Wishlist() {
    const [wishlist] = useWishlist(); // get the wishlist items

    return (
        <Layout>
            <div className="container mx-auto py-8 lg:mt-24 mt-32 xl:px-12">
                <h1 className="text-2xl font-bold text-center mb-8">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className='text-center'>
                        <p className="text-center text-lg">Your wishlist is empty!</p>
                        <Link
                            to="/allproducts"
                            className="text-blue-600 hover:text-blue-800 underline "
                        >
                            Click here to browse all products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
                        {wishlist.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Wishlist;
