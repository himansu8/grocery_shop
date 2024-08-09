import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { Menu } from '@headlessui/react';
//import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { IoIosArrowDown } from "react-icons/io";

function Header() {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <header className='max-w-screen-2xl h-14 mx-auto flex items-center fixed top-0 left-0 right-0 transition-all duration-300 bg-white z-10 shadow-md'>
            <div className='navbar xl:px-24'>
                <div className="navbar-start">
                    <a href='/'>
                        <h1 className='text-green font-bold text-xl'> 🛒 MERA KIRANA</h1>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="form-control hidden md:block">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 h-10 md:w-auto mr-2" />
                    </div>
                    <button className="btn btn-ghost btn-circle hidden lg:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 lg:flex items-center justify-center">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>

                    {auth?.user ? (
                        <Menu as="div" className="relative ">
                            <Menu.Button className="flex items-center text-gray-700 hover:bg-gray-300 rounded-lg p-2 focus:outline-none">
                                {auth?.user?.name}
                                <IoIosArrowDown className="w-5 h-5 ml-2"/>
                                
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <NavLink
                                            to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
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
                            <button className="h-10 bg-green hover:bg-[#0ab538] flex items-center px-6 gap-2 rounded-full text-white">
                                <FaRegUser /> Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
