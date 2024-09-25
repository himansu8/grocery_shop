import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { Menu } from '@headlessui/react';
import { useSearch } from '../../context/serach';
import axios from 'axios';
import { useCart } from '../../context/cart';
import { MdFavoriteBorder } from "react-icons/md";
import { useWishlist } from '../../context/wishlist';

function Header() {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [wishlist] = useWishlist()
    const [values, setValues] = useSearch();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = async (e) => {
        const keyword = e.target.value;
        setValues({ ...values, keyword });

        if (keyword.length > 1) {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/product/suggestions?keyword=${keyword}`
                );
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Error fetching suggestions", error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };
//console.log(wishlist.length)
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setShowSuggestions(false);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    const handleSuggestionClick = (suggestion) => {
        setValues({ ...values, keyword: suggestion });
        setShowSuggestions(false);
        handleSubmit({ preventDefault: () => { } });
    };

    return (
        <header className="max-w-screen-2xl mx-auto fixed flex items-center top-0 left-0 right-0 bg-white z-10 shadow-lg h-14 ">
            <div className="navbar flex flex-col md:flex-row justify-between items-center xl:px-24 h-full ">
                {/* Logo and User Controls */}
                <div className="flex items-center justify-between w-full md:w-auto h-full -ml-2 ">
                    <Link to="/" className="flex-shrink-0 ">
                        <img src="/meralogo.jpg" alt="logo" className='h-14' />
                    </Link>

                    <div className="flex items-center gap-4 md:hidden ml-4 ">
                        {auth?.user ? (
                            <Menu as="div" className="relative">
                                <Menu.Button className="flex items-center text-gray-600 hover:text-green-500">
                                    <FaRegUser className="h-5 w-10" />
                                    <span className="ml-1 text-sm">▼</span>
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 w-48 mt-2 z-10 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to={`/dashboard/${auth?.user?.role === "admin" ? 'admin' : auth?.user?.role === "vendor" ? 'vendor' : 'user'}`}
                                                className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                            >
                                                Dashboard
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                            >
                                                Logout
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <Link to="/login">
                                <button className="h-10 bg-green hover:bg-green-600 flex items-center px-6 gap-2 rounded-full text-white">
                                    <FaRegUser /> Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Search Bar and Icons */}
                <div className="flex items-center justify-between w-full md:w-auto  bg-white ">
                    <form onSubmit={handleSubmit} className="relative flex items-center w-full mb-1 md:w-80">
                        <input
                            type="text"
                            placeholder="Search"
                            value={values.keyword}
                            onChange={handleInputChange}
                            className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                        />
                        <button type="submit" className="absolute left-3 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>

                    <div className="flex items-center gap-4 ml-4 mr-2">
                        <Link to="/wishlist" className="relative">
                            <MdFavoriteBorder className="h-5 w-5 text-gray-600 hover:text-green-500" />
                            {wishlist?.length > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-green text-black rounded-full px-1">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                {/* <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{cart?.length}</span> */}
                            </svg>
                            {cart?.length > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-green text-black rounded-full px-1">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Profile Icon for Large Screens */}
                        {auth?.user ? (
                            <Menu as="div" className="relative hidden md:block">
                                <Menu.Button className="flex items-center text-gray-600 hover:text-green-500">
                                    <FaRegUser className="h-5 w-5" />
                                    <span className="ml-1 text-sm">▼</span>
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to={`/dashboard/${auth?.user?.role === "admin" ? 'admin' : auth?.user?.role === "vendor" ? 'vendor' : 'user'}`}
                                                className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                            >
                                                Dashboard
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                            >
                                                Logout
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <Link to="/login" className="hidden md:block">
                                <button className="h-10 bg-green hover:bg-green-600 flex items-center px-6 gap-2 rounded-full text-white">
                                    <FaRegUser /> Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
