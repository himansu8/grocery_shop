import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserIcon, PlusIcon, Squares2X2Icon, UsersIcon, ClipboardDocumentListIcon, BriefcaseIcon, CheckCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  return (
    <div className="h-full bg-white shadow-lg flex flex-col rounded-lg">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Admin Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-4">
        <NavLink
          to="/dashboard/admin"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <UserIcon className="w-6 h-6 mr-3" />
          Admin Profile
        </NavLink>
        <NavLink
          to="/admin/create-category"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <PlusIcon className="w-6 h-6 mr-3" />
          Create Category
        </NavLink>
        <NavLink
          to="/admin/create-product"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <Squares2X2Icon className="w-6 h-6 mr-3" />
          Create Product
        </NavLink>
        <NavLink
          to="/admin/products"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
          All Products
        </NavLink>
        <NavLink
          to="/admin/approvals"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <CheckCircleIcon className="w-6 h-6 mr-3" />
          Approvals
        </NavLink>
        <NavLink
          to="/admin/users"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <UsersIcon className="w-6 h-6 mr-3" />
          Users
        </NavLink>
        <NavLink
          to="/admin/vendors"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <BriefcaseIcon className="w-6 h-6 mr-3" />
          Vendors
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="flex items-center p-4 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
          activeClassName="bg-blue-100 text-blue-500"
        >
          <ShoppingBagIcon className="w-6 h-6 mr-3" />
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
