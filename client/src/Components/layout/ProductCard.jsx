import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { toast } from 'react-toastify';

const ProductCard = ({ product, basePath, name }) => {
    const [cart, setCart] = useCart();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const productInCart = cart.find(item => item._id === product._id);
        setIsInCart(!!productInCart);
    }, [cart, product._id]);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const handleAddToCart = () => {
        if (isInCart) {
            navigate('/cart');
        } else {
            setCart([...cart, product]);
            localStorage.setItem("cart", JSON.stringify([...cart, product]));
            toast.success("Successfully Added To Cart");
            setIsInCart(true);
        }
    };

    return (
        <div className="card shadow-xl mx-auto border border-gray-300 hover:scale-105 transition-all duration-200 w-full sm:w-60 md:w-72 p-4 flex flex-col h-full">
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartstar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}
            >
                <FaHeart className='h-5 w-5 cursor-pointer' />
            </div>

            {basePath ? (
                <Link to={`${basePath}/products/${product.slug}`}>
                    <figure className="w-full h-48 overflow-hidden">
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                            alt="card-img-top"
                            className='w-full h-full object-cover'
                        />
                    </figure>
                </Link>
            ) : (
                <figure className="w-full h-48 overflow-hidden">
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                        alt="card-img-top"
                        className='w-full h-full object-cover'
                    />
                </figure>
            )}

            <div className="card-body p-4 bg-white flex-1 flex flex-col">
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

                <p className="text-gray-600 mb-3 text-ellipsis overflow-hidden whitespace-nowrap max-h-12">
                    {product.description}
                </p>

                <h5 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    <span className="text-base text-gray-600">$</span>{product.price}
                </h5>

                {product.owner && name && (
                    <p className="text-gray-700 mb-2">
                        <strong>Vendor Name:</strong> {product.owner.name}
                    </p>
                )}

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <button
                        title={isInCart ? 'Go to Cart' : 'Add To Cart'}
                        className={`flex-1 py-2 px-4 rounded-lg shadow-md text-white transition-colors duration-300 whitespace-nowrap ${isInCart ? 'bg-green hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                        onClick={handleAddToCart}
                    >
                        {isInCart ? 'Go to Cart' : 'Add To Cart'}
                    </button>
                    <button className="flex-1 py-2 px-4 rounded-lg shadow-md bg-green text-white hover:bg-green-600 transition-colors duration-300 whitespace-nowrap">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
