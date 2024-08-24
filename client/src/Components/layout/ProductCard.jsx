import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { toast } from 'react-toastify';

const ProductCard = ({ product, basePath }) => {
    const [cart, setCart] = useCart();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();

    // Check if product is already in the cart
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

    // Helper function to render stars based on rating
    // const renderStars = (rating) => {
    //     const stars = [];
    //     for (let i = 1; i <= 5; i++) {
    //         stars.push(
    //             <FaStar
    //                 key={i}
    //                 className={`h-4 w-4 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
    //             />
    //         );
    //     }
    //     return stars;
    // };

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

                {/* Rating */}
                {/* <div className="flex items-center mb-3">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-gray-600">{product?.rating?.toFixed(1)}</span>
                </div> */}

                <p className="text-gray-600 mb-3 text-ellipsis whitespace-nowrap overflow-hidden">{product.description}</p>
                <div className="mb-4">
                    <h5 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                        <span className="text-base text-gray-600">$</span>{product.price}
                    </h5>

                    <div className="flex space-x-2">
                        <button
                            title={isInCart ? 'Go to Cart' : 'Add To Cart'}
                            className={`flex-1 py-2 px-4 rounded-lg shadow-md text-white transition-colors duration-300 ${isInCart ? 'bg-green hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                            onClick={handleAddToCart}
                        >
                            {isInCart ? 'Go to Cart' : 'Add To Cart'}
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-lg shadow-md bg-green text-white hover:bg-green-600 transition-colors duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
