import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import UserSidebar from '../../Components/layout/UserSidebar';
import axios from 'axios';
import { useAuth } from '../../context/auth';

function Address() {
    const [auth] = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        mobileNumber: '',
    });
    const [editingAddress, setEditingAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/address/all/user`, {
                    headers: {
                        authorization: auth?.token,
                    },
                });
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/address/create`, newAddress,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            setAddresses([...addresses, response.data]);
            setNewAddress({
                name: '',
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                mobileNumber: '',
            });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const openModal = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
    };

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/address/update/${editingAddress._id}`, editingAddress,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            setAddresses(addresses.map((address) => (address._id === response.data._id ? response.data : address)));
            closeModal();
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleDeleteAddress = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/address/delete/${id}`,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            setAddresses(addresses.filter((address) => address._id !== id));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <Layout>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <UserSidebar />
                    </div>
                    <div className="w-full md:w-9/12 mt-6 md:mt-0">
                        <div className="md:p-4">
                            <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
                                <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>

                                <div className="w-full space-y-4">
                                    {addresses.length > 0 ? (
                                        addresses.map((address) => (
                                            <div key={address._id} className="p-4 bg-gray-100 border rounded-md shadow-sm">
                                                <p className="text-xl font-medium">{address.name} </p>
                                                <p className="text-lg font-medium"> {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
                                                <p className="text-sm text-gray-600">Mobile: {address.mobileNumber}</p>
                                                <div className="mt-2 flex space-x-4">
                                                    <button
                                                        onClick={() => openModal(address)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(address._id)}
                                                        className="bg-red hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">No addresses found</p>
                                    )}
                                </div>

                                <form onSubmit={handleAddAddress} className="mt-6 bg-gray-50 p-6 rounded-md shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={newAddress.name}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="street"
                                            placeholder="Street"
                                            value={newAddress.street}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={newAddress.city}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={newAddress.state}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="postalCode"
                                            placeholder="Postal Code"
                                            value={newAddress.postalCode}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            value={newAddress.country}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            placeholder="Mobile Number"
                                            value={newAddress.mobileNumber}
                                            onChange={handleChange}
                                            className="p-2 border rounded w-full"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 bg-green hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Add Address
                                    </button>
                                </form>

                                {/* Modal for Editing Address */}
                                {isModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-6 rounded-md w-full max-w-lg">
                                            <h3 className="text-xl font-semibold mb-4">Edit Address</h3>
                                            <form onSubmit={handleUpdateAddress}>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Full Name"
                                                        value={editingAddress.name}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        placeholder="Street"
                                                        value={editingAddress.street}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, street: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="City"
                                                        value={editingAddress.city}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        placeholder="State"
                                                        value={editingAddress.state}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, state: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        placeholder="Postal Code"
                                                        value={editingAddress.postalCode}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, postalCode: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        placeholder="Country"
                                                        value={editingAddress.country}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, country: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="mobileNumber"
                                                        placeholder="Mobile Number"
                                                        value={editingAddress.mobileNumber}
                                                        onChange={(e) => setEditingAddress({ ...editingAddress, mobileNumber: e.target.value })}
                                                        className="p-2 border rounded w-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="mr-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                                    >
                                                        Update Address
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Address;
