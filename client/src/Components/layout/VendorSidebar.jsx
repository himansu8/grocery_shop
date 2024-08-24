import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, PlusIcon, ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const VendorSidebar = () => {
  return (
    <div className="h-full bg-white shadow-lg flex flex-col rounded-lg">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Vendor Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-4">
        <NavLink
          to="/dashboard/vendor"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <UserIcon className="w-6 h-6 mr-3" />
          Vendor Profile
        </NavLink>
        <NavLink
          to="/vendor/products"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ShoppingBagIcon className="w-6 h-6 mr-3" />
          My Products
        </NavLink>
        <NavLink
          to="/dashboard/vendor/addproduct"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <PlusIcon className="w-6 h-6 mr-3" />
          Add Product
        </NavLink>
        <NavLink
          to="/vendor/orders"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
          Orders
        </NavLink>
        <NavLink
          to="/vendor/earnings"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <CurrencyDollarIcon className="w-6 h-6 mr-3" />
          Earnings
        </NavLink>
      </nav>
    </div>
  );
};

export default VendorSidebar;
