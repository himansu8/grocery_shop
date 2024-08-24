import React, { useEffect, useState } from 'react';
import Layout from '../../Components/layout/Layout';
import CreateCategoryForm from '../../Components/form/CreateCategoryForm';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal } from "antd";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import AdminSidebar from '../../Components/layout/AdminSidebar';
import axios from 'axios';

function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [auth] = useAuth();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/category/create-category`,
                { name },
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                setName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    // Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/category/get-category`
            );
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);
//console.log(categories)
    // Update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/category/update-category/${selected._id}`,
                { name: updatedName },
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const { data } = await axios.delete(
                                `${process.env.REACT_APP_BASE_URL}/api/category/delete-category/${id}`,
                                {
                                    headers: {
                                        authorization: auth?.token,
                                    },
                                }
                            );
                            if (data.success) {
                                toast.success(`Category is deleted`);
                                getAllCategory();
                            } else {
                                toast.error(data.message);
                            }
                        } catch (error) {
                            toast.error("Something went wrong");
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => toast.error("Deletion cancelled")
                }
            ]
        });
    };

    return (
        <Layout title="Dashboard - Create Category">
            <div className="max-w-screen-2xl mx-auto xl:px-24 px-4 mt-24">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        <AdminSidebar />
                    </div>
                    <div className="w-full md:w-9/12 md:pl-6 mt-6 md:mt-0 md:p-4">
                        <div className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">Manage Categories</div>
                        <div className="mb-6 md:w-1/2 mx-auto">
                            <CreateCategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-full mt-6">
                            <table className="w-full border-separate border border-gray-300 rounded-md shadow-sm">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id} className="border-b">
                                            <td className="px-6 py-3">{c.name}</td>
                                            <td className="px-6 py-3 flex space-x-2">
                                                <button
                                                    className="bg-blue-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm bg-red hover:bg-[#FF2C2C] focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    onClick={() => handleDelete(c._id)}
                                                >
                                                    Delete
                                                </button>
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
                            className="p-4"
                        >
                            <CreateCategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateCategory;
