import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Layout from '../../Components/layout/Layout';
import AdminSidebar from '../../Components/layout/AdminSidebar';

function UsersData() {
    const [auth] = useAuth();
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPhone, setUpdatedPhone] = useState("");

    // Fetch all users
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/auth/users`,
            );
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Handle update user
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/auth/user/${selectedUser._id}`,
                { name: updatedName, email: updatedEmail, phone: updatedPhone },
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success(`User ${updatedName} is updated`);
                setSelectedUser(null);
                setUpdatedName("");
                setUpdatedEmail("");
                setUpdatedPhone("");
                setVisible(false);
                getAllUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user");
        }
    };

    // Handle delete user
    // const handleDelete = async (id) => {
    //     try {
    //         const { data } = await axios.delete(
    //             `${process.env.REACT_APP_BASE_URL}/api/users/delete-user/${id}`,
    //             {
    //                 headers: {
    //                     authorization: auth?.token,
    //                 },
    //             }
    //         );
    //         if (data.success) {
    //             toast.success("User is deleted");
    //             getAllUsers();
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to delete user");
    //     }
    // };

    return (
        <Layout title="Dashboard - Manage Users">
            <div className="max-w-screen-2xl mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    <div className="w-full md:w-9/12 md:pl-6 mt-6 md:mt-0 md:p-4">
                        <div className="w-full mt-6">
                            <div className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">Manage Users</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border border-gray-300 rounded-md shadow-sm">
                                    <thead className="bg-gray-100 text-gray-600">
                                        <tr>
                                        <th className="px-4 py-2 text-left text-sm md:text-base">Sl No.</th>
                                            <th className="px-4 py-2 text-left text-sm md:text-base">Name</th>
                                            <th className="px-4 py-2 text-left text-sm md:text-base">Email</th>
                                            <th className="px-4 py-2 text-left text-sm md:text-base">Phone</th>
                                            <th className="px-4 py-2 text-left text-sm md:text-base">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((user, index) => (
                                            <tr key={user._id} className="border-b">
                                                 <td className="px-4 py-2 text-sm md:text-base">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm md:text-base">{user.name}</td>
                                                <td className="px-4 py-2 text-sm md:text-base">{user.email}</td>
                                                <td className="px-4 py-2 text-sm md:text-base">{user.phone}</td>
                                                <td className="px-4 py-2 text-sm md:text-base flex space-x-2">
                                                    <button
                                                        className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setSelectedUser(user);
                                                            setUpdatedName(user.name);
                                                            setUpdatedEmail(user.email);
                                                            setUpdatedPhone(user.phone);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    {/* <button
                                                        className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                visible={visible}
                                className="p-4 max-w-lg mx-auto"
                            >
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={updatedEmail}
                                            onChange={(e) => setUpdatedEmail(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={updatedPhone}
                                            onChange={(e) => setUpdatedPhone(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Update User
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UsersData;
