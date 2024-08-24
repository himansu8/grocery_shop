import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Components/layout/Layout';
import { toast } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useCart } from '../context/cart';

function SingleProduct() {
    const { slug } = useParams();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/single-product/${slug}`);
                setProduct(response.data.product);
                if (response.data.product) {
                    getSimilarProduct(response.data.product._id, response.data.product.category._id);
                    checkIfProductInCart(response.data.product._id);
                }
            } catch (error) {
                toast.error('Failed to fetch product details');
            }
        };

        fetchProduct();
    }, [slug]);

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products || []);
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfProductInCart = (productId) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = storedCart.some(item => item._id === productId);
        setIsProductInCart(isInCart);
    };

    const handleAddToCart = () => {
        const updatedCart = [...cart, { ...product, count: 1 }]; // Setting default count as 1
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setIsProductInCart(true);
        toast.success("Successfully Added To Cart");
    };
    
    return (
        <Layout>
            <div className="container mx-auto xl:px-28 px-4 mt-32 mb-12">
                <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Product Image Carousel */}
                    <div className="lg:w-1/2 p-2 border-r border-gray-300 flex justify-center items-center">
                        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true} showThumbs={false}>
                            <div className="w-80 mx-auto">
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${product?._id}`}
                                    alt={product?.name}
                                />
                            </div>
                        </Carousel>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 p-4 flex flex-col justify-between">
                        <h1 className="text-2xl font-bold mb-2 text-gray-900">{product?.name}</h1>

                        {/* Price Details */}
                        <div className="mb-4">
                            <p className="text-xl text-green-600 font-semibold">₹{product?.price}.00</p>
                            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                        </div>

                        {/* Add to Cart and Buy Now Buttons */}
                        <div className="flex flex-col space-y-2 mb-4">
                            <button
                                className={`py-2 rounded-lg transition-transform transform hover:scale-105 shadow-md ${isProductInCart ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                onClick={isProductInCart ? null : handleAddToCart}
                                disabled={isProductInCart}
                            >
                                {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                            <button
                                className="bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105 shadow-md"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Additional Product Info */}
                        <div className="mb-4">
                            <p className="text-gray-700 mb-1"><span className="font-medium">SKU:</span> {product?.quantity}</p>
                            <p className="text-gray-700 mb-1">
                                <span className="font-medium">Availability:</span>
                                <span className={product?.quantity ? "text-green-600" : "text-red-600"}>
                                    {product?.quantity ? "In Stock" : "Out Of Stock"}
                                </span>
                            </p>
                            <p className="text-gray-700"><span className="font-medium">Country Of Origin:</span> India</p>
                        </div>

                        {/* Wishlist and Compare */}
                        <div className="flex space-x-4 mb-4 text-sm">
                            <button className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105">Add to Wishlist</button>
                        </div>

                        {/* Delivery Check */}
                        <div className="mb-4">
                            <p className="text-lg font-medium mb-2">Delivery</p>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Enter Delivery Pincode"
                                    className="border rounded-lg px-3 py-2 flex-1"
                                />
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
                                    Check
                                </button>
                            </div>
                        </div>

                        {/* Write a Review */}
                        <div>
                            <button className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105">Write a Review</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-200" />
            <div className="container mx-auto xl:px-28 px-4 mt-8 mb-16">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Similar Products</h2>
                {relatedProducts.length < 1 ? (
                    <p className="text-center text-gray-700">No Similar Products found</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedProducts.map((p) => (
                            <div key={p._id} className="shadow-md rounded-lg hover:scale-105 transition-transform duration-200">
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${p._id}`}
                                    className="w-44 mx-auto"
                                    alt={p.name}
                                />
                                <div className="p-3">
                                    <h5 className="text-md font-semibold mb-1">{p.name}</h5>
                                    <p className="text-gray-700 text-sm mb-1">{p.description.substring(0, 40)}...</p>
                                    <p className="text-gray-900 font-semibold mb-2">₹{p.price}.00</p>
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <button
                                            className="bg-blue-600 text-white py-1 px-2 rounded-lg text-sm hover:bg-blue-700 transition-transform transform hover:scale-105"
                                            onClick={() => navigate(`/single/products/${p.slug}`)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default SingleProduct;
