import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Components/layout/Layout';
import UserSidebar from '../../Components/layout/UserSidebar';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [auth, setAuth] = useAuth();
const navigate = useNavigate()
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, {
        name,
        password,
        phone,
        address,
      },
      {
        headers: {
            authorization: auth?.token,
        },
    }
    );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updateduser });
        localStorage.setItem('auth', JSON.stringify({ ...auth, user: data.updateduser }));
        toast.success('Profile Updated Successfully');
        navigate("/dashboard/user")
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

//   Handle profile deletion
//   const handleDelete = async () => {
//     try {
//       const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`);
//       if (data?.success) {
//         setAuth(null);
//         localStorage.removeItem('auth');
//         toast.success('Profile Deleted Successfully');
//         // Redirect to home or login page after deletion
//         window.location.href = '/';
//       } else {
//         toast.error('Failed to delete profile');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong');
//     }
//   };

  return (
    <Layout >
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar (Responsive) */}
          <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
            <UserSidebar />
          </div>
          {/* Main Content (Responsive) */}
          <div className="w-full md:w-9/12 mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold mt-10 mb-6">Update Profile</h2>
            <form  className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  value={email}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
                <p className="text-sm text-gray-500">Leave blank to keep current password</p>
              </div>

              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Address</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                />
              </div>

              <button
                onClick={handleUpdate}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"

              >
                Update Profile
              </button>
            </form>
{/* 
            <div className="mt-8">
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete Profile
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProfile;
