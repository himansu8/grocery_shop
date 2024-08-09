import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '@headlessui/react';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <header className='max-w-screen-2xl mx-auto fixed top-14 left-0 right-0 transition-all flex items-center duration-300 bg-green h-12 shadow-md'>
                <div className='navbar xl:px-24 flex justify-between items-center text-center'>
                    {/* "All Categories" Dropdown */}
                    <div className="navbar-start">
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center gap-2 cursor-pointer hover:bg-[#0ab538] rounded-full p-2 text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                                <span className='font-medium'>All Categories</span>
                            </Menu.Button>
                            <Menu.Items className="absolute bg-base-100 rounded-box z-30 mt-2 w-52 p-2 shadow left-0 text-left">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link 
                                            to='/homepage' 
                                            className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Homepage
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link 
                                            to='/portfolio' 
                                            className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Portfolio
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link 
                                            to='/about' 
                                            className={`block px-4 py-2 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            About
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="navbar-end md:hidden">
                        <button
                            className='flex items-center space-x-2 bg-transparent border-0 p-2 rounded-full hover:bg-gray-100 focus:outline-none'
                            onClick={toggleSidebar}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                            <span className='font-medium text-gray-700'>Menu</span>
                        </button>
                    </div>

                    {/* Navbar Items for Large Screens */}
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><NavLink to='/' className='navbar-item' activeClassName='active'>Home</NavLink></li>
                            <li><NavLink to='/offers' activeClassName='active'>Offers</NavLink></li>
                            <li><NavLink to='/all-products' activeClassName='active'>All Products</NavLink></li>
                            <li><NavLink to='/new-items' activeClassName='active'>New Items</NavLink></li>
                        </ul>
                    </div>

                    <div className="navbar-end hidden md:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-40`}
                onClick={closeSidebar}
            >
                <div
                    className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className='absolute top-4 right-4 text-gray-500'
                        onClick={toggleSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className='flex flex-col p-4'>
                        <h1 className='text-2xl font-bold mb-4'>Company Name</h1>
                        <ul className='space-y-2'>
                            <li><Link to='/offers' onClick={closeSidebar}>Offers</Link></li>
                            <li><Link to='/all-products' onClick={closeSidebar}>All Products</Link></li>
                            <li><Link to='/new-items' onClick={closeSidebar}>New Items</Link></li>
                            <li><Link to='/about' onClick={closeSidebar}>About</Link></li>
                            <li><Link to='/contact' onClick={closeSidebar}>Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
