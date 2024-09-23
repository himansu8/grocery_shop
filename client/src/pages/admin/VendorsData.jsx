import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Layout from '../../Components/layout/Layout';
import AdminSidebar from '../../Components/layout/AdminSidebar';

function VendorsData() {
    const [auth] = useAuth();
    const [vendors, setVendors] = useState([]);
    const [visible, setVisible] = useState(false);
    const [newVendorVisible, setNewVendorVisible] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedOwnerName, setUpdatedOwnerName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPhone, setUpdatedPhone] = useState("");
    const [newVendorName, setNewVendorName] = useState("");
    const [newVendorOwnerName, setNewVendorOwnerName] = useState("");
    const [newVendorEmail, setNewVendorEmail] = useState("");
    const [newVendorPhone, setNewVendorPhone] = useState("");
    const [newVendorAddress, setNewVendorAddress] = useState("");
    const [newVendorAnswer, setNewVendorAnswer] = useState("");
    const [newVendorPassword, setNewVendorPassword] = useState("");

    
    const getAllVendors = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/vendor`,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                setVendors(data.vendors);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch vendors");
        }
    };

    useEffect(() => {
        getAllVendors();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/vendor/update/${selectedVendor._id}`,
                { name: updatedName, ownerName: updatedOwnerName, email: updatedEmail, phone: updatedPhone },
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success(`Vendor ${updatedName} is updated`);
                setSelectedVendor(null);
                setUpdatedName("");
                setUpdatedOwnerName("");
                setUpdatedEmail("");
                setUpdatedPhone("");
                setVisible(false);
                getAllVendors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update vendor");
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/admin/vendor/${id}`,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success("Vendor is deleted");
                getAllVendors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete vendor");
        }
    };

    const handleAddNewVendor = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/vendor/signup`,
                {
                    name: newVendorName,
                    ownerName: newVendorOwnerName,
                    email: newVendorEmail,
                    phone: newVendorPhone,
                    address: newVendorAddress,
                    answer: newVendorAnswer,
                    password: newVendorPassword
                },
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success(`Vendor ${newVendorName} added successfully`);
                setNewVendorName("");
                setNewVendorOwnerName("");
                setNewVendorEmail("");
                setNewVendorPhone("");
                setNewVendorVisible(false);
                setNewVendorAddress("");
                setNewVendorAnswer("");
                setNewVendorPassword("");
                getAllVendors();
            
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add vendor");
        }
    };

    return (
        <Layout title="Dashboard - Manage Vendors">
            <div className="max-w-screen-2xl mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    <div className="w-full md:w-9/12 md:pl-6 mt-6 md:mt-0 md:p-4">
                        <div className="w-full mt-6">
                            <div className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">Manage Vendors</div>
                            <div className="mb-4 text-right">
                                <button
                                    className="bg-green text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={() => setNewVendorVisible(true)}
                                >
                                    Add New Vendor
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border border-gray-300 rounded-md shadow-sm">
                                    <thead className="bg-gray-100 text-gray-600">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Sl No.</th>
                                            <th className="px-6 py-3 text-left">Name</th>
                                            <th className="px-6 py-3 text-left">Owner Name</th>
                                            <th className="px-6 py-3 text-left">Email</th>
                                            <th className="px-6 py-3 text-left">Phone</th>
                                            <th className="px-6 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendors?.map((vendor, index) => (
                                            <tr key={vendor._id} className="border-b">
                                                <td className="px-6 py-3">{index + 1}</td>
                                                <td className="px-6 py-3">{vendor.name}</td>
                                                <td className="px-6 py-3">{vendor.ownerName}</td>
                                                <td className="px-6 py-3">{vendor.email}</td>
                                                <td className="px-6 py-3">{vendor.phone}</td>
                                                <td className="px-6 py-3 flex space-x-2">
                                                    <button
                                                        className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setSelectedVendor(vendor);
                                                            setUpdatedName(vendor.name);
                                                            setUpdatedOwnerName(vendor.ownerName);
                                                            setUpdatedEmail(vendor.email);
                                                            setUpdatedPhone(vendor.phone);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red text-white py-1 px-3 rounded-md shadow-sm hover:bg-[#FF2C2C] focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        onClick={() => handleDelete(vendor._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Update Vendor Modal */}
                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                visible={visible}
                                className="p-4"
                            >
                                <form >
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
                                            Owner Name
                                        </label>
                                        <input
                                            type="text"
                                            value={updatedOwnerName}
                                            onChange={(e) => setUpdatedOwnerName(e.target.value)}
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
                                            type="tel"
                                            value={updatedPhone}
                                            onChange={(e) => setUpdatedPhone(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onSubmit={handleUpdate}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                        type='button'
                                            onClick={() => setVisible(false)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Modal>

                            {/* New Vendor Modal */}
                            <Modal
                                onCancel={() => setNewVendorVisible(false)}
                                footer={null}
                                visible={newVendorVisible}
                                className="p-4"
                            >
                                <form onSubmit={handleAddNewVendor}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Vendor Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newVendorName}
                                            onChange={(e) => setNewVendorName(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Owner Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newVendorOwnerName}
                                            onChange={(e) => setNewVendorOwnerName(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newVendorEmail}
                                            onChange={(e) => setNewVendorEmail(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={newVendorPhone}
                                            onChange={(e) => setNewVendorPhone(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={newVendorAddress}
                                            onChange={(e) => setNewVendorAddress(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div><div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                           Secret Question
                                        </label>
                                        <input
                                        placeholder='What is your fav game?'
                                            type="text"
                                            value={newVendorAnswer}
                                            onChange={(e) => setNewVendorAnswer(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div><div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={newVendorPassword}
                                            onChange={(e) => setNewVendorPassword(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="submit"
                                            className="bg-green text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Add Vendor
                                        </button>
                                        <button
                                            onClick={() => setNewVendorVisible(false)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VendorsData;
