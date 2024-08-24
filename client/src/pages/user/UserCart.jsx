import React from 'react';
import UserSidebar from '../../Components/layout/UserSidebar';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/cart';
import { Link } from 'react-router-dom';
import Layout from '../../Components/layout/Layout';

const UserCart = () => {
    const [cart, setCart] = useCart();

    const initializeCartItem = (item) => ({
        ...item,
        quantityInCart: item.quantityInCart || 1,
    });

    const initializedCart = cart.map(initializeCartItem);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemove = (id) => {
        const updatedCart = initializedCart.filter((item) => item._id !== id);
        updateCart(updatedCart);
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = initializedCart.map((item) =>
            item._id === id
                ? { ...item, quantityInCart: Math.max(1, Math.min(newQuantity, item.quantity)) }
                : item
        );
        updateCart(updatedCart);
    };

    const total = initializedCart.reduce(
        (acc, item) => acc + item.price * (item.quantityInCart || 0),
        0
    );

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="w-full md:w-3/12 md:flex-shrink-0 p-4 md:pr-8">
                        <UserSidebar />
                    </div>
                    {/* Main Content */}
                    <div className="w-full md:w-9/12 mt-8 md:mt-0">
                        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                            <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Your Shopping Cart</h1>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Cart Items Section */}
                                <div className="lg:col-span-8">
                                    {initializedCart.length === 0 ? (
                                        <div className="text-center p-8 bg-gray-100 rounded-lg shadow-md">
                                            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
                                            <p className="text-gray-600 mb-4">Start shopping to add products to your cart.</p>
                                            <Link
                                                to="/allproducts"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Browse all products
                                            </Link>
                                        </div>
                                    ) : (
                                        initializedCart.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_BASE_URL}/api/product/product-photo/${item._id}`}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                                <div className="flex-grow md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                                                    <span className="text-xl font-medium text-gray-800">{item.name}</span>
                                                    <div className="mt-2 text-gray-600">
                                                        <span>Price: ₹{item.price}</span>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-center md:justify-start">
                                                        <button
                                                            onClick={() => handleQuantityChange(item._id, item.quantityInCart - 1)}
                                                            disabled={item.quantityInCart <= 1}
                                                            className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="mx-4 text-lg font-medium">{item.quantityInCart}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item._id, item.quantityInCart + 1)}
                                                            disabled={item.quantityInCart >= item.quantity}
                                                            className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {item.quantityInCart >= item.quantity && (
                                                        <p className="text-red-500 text-sm mt-2">
                                                            Max stock available: {item.quantity}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-center mt-4 md:mt-0">
                                                    <span className="text-lg font-semibold text-gray-800">₹{item.price * item.quantityInCart}</span>
                                                    <TrashIcon
                                                        className="w-6 h-6 text-red cursor-pointer hover:text-[#8B0000] mt-2"
                                                        onClick={() => handleRemove(item._id)}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Summary Section */}
                                <div className="lg:col-span-4 bg-gray-100 shadow-md rounded-lg p-6">
                                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Price Details</h2>
                                    <div className="flex justify-between mb-4 text-lg text-gray-700">
                                        <span>Subtotal</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between mb-4 text-lg text-gray-700">
                                        <span>Tax (18%)</span>
                                        <span>₹{(total * 0.18).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-semibold border-t pt-4 text-gray-800">
                                        <span>Total Amount</span>
                                        <span>₹{(total * 1.18).toFixed(2)}</span>
                                    </div>
                                    <button className="w-full mt-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserCart;
