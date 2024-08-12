import React, { useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, basePath }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className="card md:w-72 shadow-xl md:p-4 mx-auto border border-gray-300 hover:scale-105 transition-all duration-200" key={product._id}>
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartstar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}
            >
                <FaHeart className='h-5 w-5 cursor-pointer' />
            </div>

            {/* Conditional rendering for Link or non-clickable wrapper */}
            {basePath ? (
                <Link to={`${basePath}/products/${product.slug}`}>
                    <figure>
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                            alt="card-img-top"
                            className='hover:scale-105 transition-all duration-200 md:h-48'
                        />
                    </figure>
                </Link>
            ) : (
                <figure>
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                        alt="card-img-top"
                        className='hover:scale-105 transition-all duration-200 md:h-48'
                    />
                </figure>
            )}

            <div className="card-body p-4 bg-white">
                {basePath ? (
                    <Link to={`${basePath}/products/${product.slug}`} className="block mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
                            {product.name}
                        </h2>
                    </Link>
                ) : (
                    <div className="block mb-3">
                        <h2 className="text-xl font-semibold text-gray-500">
                            {product.name}
                        </h2>
                    </div>
                )}

                <p className="text-gray-600 mb-3 text-ellipsis whitespace-nowrap overflow-hidden">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold text-gray-800">
                        <span className="text-base text-gray-600">$</span>{product.price}
                    </h5>
                    <div className="flex items-center space-x-2">
                        <button className="bg-blue-500 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
                            <FaShoppingCart className='h-5 w-5' />
                        </button>
                        <button className={`py-2 px-4 rounded-lg shadow-md transition-colors duration-200  bg-green text-white hover:bg-blue-700 "}`}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
