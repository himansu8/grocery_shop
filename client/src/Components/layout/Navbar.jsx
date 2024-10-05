import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import useCategory from '../../hooks/useCategory';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const categories = useCategory();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleCategoryClick = (categoryId) => {
        navigate('/allproducts', {
            state: { selectedCategory: categoryId }
        });
        closeSidebar();
    };

    return (
        <>
            <header className='max-w-screen-2xl mx-auto fixed xl:top-14 top-24 left-0 right-0 transition-all flex items-center duration-300 bg-green h-12 shadow-md'>
                <div className='navbar xl:px-24 flex justify-between items-center text-center'>
                    {/* "All Categories" Dropdown */}
                    <div className="navbar-start">
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center gap-2 cursor-pointer hover:bg-[#0ab538] rounded-full p-2 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
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
                            <Menu.Items className="absolute bg-base-100 rounded-box z-30 mt-2 w-52 p-2 shadow left-0 text-left cursor-pointer ">
                                {categories.map((c) => (
                                    <Menu.Item key={c._id}>
                                        {({ active }) => (
                                            <div
                                                className={`block px-4 py-2 ${active ? 'bg-gray-400 text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                                                onClick={() => handleCategoryClick(c._id)}
                                            >
                                                {c.name}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
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
                                className="h-5 w-5 text-white"
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
                            <span className='font-medium text-white'>Menu</span>
                        </button>
                    </div>

                    {/* Navbar Items for Large Screens */}
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li>
                                <NavLink to='/' className={({ isActive }) => isActive ? 'navbar-item text-gray-700 font-bold' : 'navbar-item text-white hover:text-gray-700'}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/offers' className={({ isActive }) => isActive ? 'navbar-item text-gray-700 font-bold' : 'navbar-item text-white hover:text-gray-700'}>
                                    Offers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/allproducts' className={({ isActive }) => isActive ? 'navbar-item text-gray-700 font-bold' : 'navbar-item text-white hover:text-gray-700'}>
                                    All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/new-items' className={({ isActive }) => isActive ? 'navbar-item text-gray-700 font-bold' : 'navbar-item text-white hover:text-gray-700'}>
                                    New Items
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-end hidden md:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li>
                                <Link to='/about' className='text-white hover:text-gray-700'>About</Link>
                            </li>
                            <li>
                                <Link to='/contact' className='text-white hover:text-gray-700'>Contact</Link>
                            </li>
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
                        <h1 className='text-2xl font-bold mb-4'>
                            <img src="/meralogo.jpg" alt="logo" className='w-full h-14 -ml-4'/>
                        </h1>
                        <ul className='space-y-2'>
                            <li><Link to='/offers' onClick={closeSidebar} className='text-gray-700 hover:text-green-600'>Offers</Link></li>
                            <li><Link to='/allproducts' onClick={closeSidebar} className='text-gray-700 hover:text-green-600'>All Products</Link></li>
                            <li><Link to='/new-items' onClick={closeSidebar} className='text-gray-700 hover:text-green-600'>New Items</Link></li>
                            <li><Link to='/about' onClick={closeSidebar} className='text-gray-700 hover:text-green-600'>About</Link></li>
                            <li><Link to='/contact' onClick={closeSidebar} className='text-gray-700 hover:text-green-600'>Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
