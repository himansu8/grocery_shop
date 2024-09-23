import Layout from '../../Components/layout/Layout'
import React from 'react';
import UserSidebar from '../../Components/layout/UserSidebar'
import { useAuth } from '../../context/auth'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function UserDashboard() {
  const [auth] = useAuth()
  return (
    <Layout>
<div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar (Responsive) */}
          <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
            <UserSidebar />
          </div>
          {/* Main Content (Responsive) */}
          <div className="w-full md:w-9/12 mt-6 md:mt-0">
            <div className="md:p-4">
              {/* Advanced Admin Details Card */}
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center p-6">
                  {/* Profile Image */}
                  <div className="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Admin Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Admin Info */}
                  <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800">{auth?.user?.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">Mera Kirana User</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-center md:justify-start text-gray-600">
                        <MdEmail className="text-xl mr-2" />
                        <span>{auth?.user?.email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
                        <MdPhone className="text-xl mr-2" />
                        <span>{auth?.user?.phone}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
                        <MdLocationOn className="text-xl mr-2" />
                        <span>{auth?.user?.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add additional content */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard