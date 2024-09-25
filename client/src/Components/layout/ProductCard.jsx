import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { toast } from 'react-toastify';
import { useWishlist } from '../../context/wishlist';

const ProductCard = ({ product, basePath, name }) => {
    const [cart, setCart] = useCart();
    const [wishlist, setWishlist, isProductInWishlist, toggleWishlist] = useWishlist();
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if product is already in cart or wishlist
        const productInCart = cart.find(item => item._id === product._id);
        setIsInCart(!!productInCart);

        setIsHeartFilled(isProductInWishlist(product._id));
    }, [cart, wishlist, product._id, isProductInWishlist]);

    const handleHeartClick = () => {
        toggleWishlist(product);
        setIsHeartFilled(!isHeartFilled);
        toast.success(isHeartFilled ? "Removed from Wishlist" : "Added to Wishlist");
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
        <div className="card shadow-lg mx-auto border border-gray-300 hover:scale-105 transition-all duration-200 w-full sm:w-48 md:w-56 p-2 flex flex-col h-full">
            <div
                className={`rating gap-1 absolute right-2 top-2 p-2 heartstar bg-green ${isHeartFilled ? "text-rose-800" : "text-white"}`}
                onClick={handleHeartClick}
            >
                <FaHeart className='h-4 w-8 lg:w-8 cursor-pointer' />
            </div>

            {basePath ? (
                <Link to={`${basePath}/products/${product.slug}`}>
                    <figure className="w-full overflow-hidden">
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                            alt="card-img-top"
                            className='w-full h-24 sm:h-36 md:h-36 lg:h-36 object-cover'
                        />
                    </figure>
                </Link>
            ) : (
                <figure className="w-full overflow-hidden">
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product._id}`}
                        alt="card-img-top"
                        className='w-full h-24 sm:h-36 md:h-36 lg:h-36 object-cover'
                    />
                </figure>
            )}

            <div className="card-body p-2 bg-white flex-1 flex flex-col">
                {basePath ? (
                    <Link to={`${basePath}/products/${product.slug}`} className="block">
                        <h2 className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
                            {product.name}
                        </h2>
                    </Link>
                ) : (
                    <div className="block mb-2">
                        <h2 className="text-sm font-semibold text-gray-500">
                            {product.name}
                        </h2>
                    </div>
                )}

                <p className="text-gray-600 mb-2 text-xs text-ellipsis overflow-hidden whitespace-nowrap max-h-8">
                    {product.description}
                </p>

                <h5 className="text-md md:text-lg font-bold text-gray-900 mb-3">
                    <span className="text-base text-gray-600">$</span>{product.price}
                </h5>

                {product.owner && name && (
                    <p className="text-gray-700 mb-1 text-xs">
                        <strong>Vendor Name:</strong> {product.owner.name}
                    </p>
                )}

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <button
                        title={isInCart ? 'Go to Cart' : 'Add To Cart'}
                        className={`flex-1 py-1 px-2 rounded-lg shadow-md text-white transition-colors duration-300 text-sm ${isInCart ? 'bg-green hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                        onClick={handleAddToCart}
                    >
                        {isInCart ? 'Go to Cart' : 'Add To Cart'}
                    </button>
                    <button
                        className="flex-1 py-1 px-2 rounded-lg shadow-md bg-green text-white hover:bg-green-600 transition-colors duration-300 text-sm"
                        onClick={() => { handleAddToCart(); navigate('/cart') }}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
