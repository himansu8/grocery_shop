import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserCircleIcon, ClipboardDocumentListIcon, ShoppingCartIcon, CogIcon } from '@heroicons/react/24/outline';

const UserSidebar = () => {
    
  return (
    <div className="h-full bg-white shadow-lg flex flex-col rounded-lg">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-4">
        <NavLink
          to="/dashboard/user"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <HomeIcon className="w-6 h-6 mr-3" />
          My Profile
        </NavLink>
        <NavLink
          to="/user/updateprofile"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <UserCircleIcon className="w-6 h-6 mr-3" />
          Edit Profile
        </NavLink>
        <NavLink
          to="/user/address"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <UserCircleIcon className="w-6 h-6 mr-3" />
          My Address
        </NavLink>
        <NavLink
          to="/user/orders"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
          My Orders
        </NavLink>
        <NavLink
          to="/user/cart"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ShoppingCartIcon className="w-6 h-6 mr-3" />
          My Cart
        </NavLink>
        <NavLink
          to="/user/settings"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <CogIcon className="w-6 h-6 mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default UserSidebar;
