import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AdminSidebar from '../../Components/layout/AdminSidebar';
import Layout from '../../Components/layout/Layout';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import VendorSidebar from '../../Components/layout/VendorSidebar';

const { Option } = Select;

function UpdateProducts() {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState(null);
    const [id, setId] = useState("");
    const [auth] = useAuth();

    // Get single product data
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/single-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
            toast.error("Error in getting product data");
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/category/get-category`);
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

    // Update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            if (photo) {
                productData.append("photo", photo);
            }
            productData.append("category", category);

            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/product/update-product/${id}`,
                productData,
                {
                    headers: {
                        authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success("Product Updated Successfully");
                if (auth?.user.role === "admin") {
                    navigate("/admin/products");
                }
                if (auth?.user.role === "vendor") {
                    navigate("/vendor/products");
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Delete product function
    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            console.log("Deleting product with ID:", id); // Debugging statement
                            const { data } = await axios.delete(
                                `${process.env.REACT_APP_BASE_URL}/api/product/delete-product/${id}`,
                                {
                                    headers: {
                                        authorization: auth?.token,
                                    },
                                }
                            );
                            console.log("Delete response:", data); // Debugging statement
    
                            if (data.success) {
                                toast.success("Product Deleted Successfully");
                                if (auth?.user.role === "admin") {
                                    navigate("/admin/products");
                                }
                                if (auth?.user.role === "vendor") {
                                    navigate("/vendor/products");
                                }
                            } else {
                                toast.error(data.message);
                            }
                        } catch (error) {
                            console.log("Error in deleting product:", error); // Debugging statement
                            toast.error("Something went wrong while deleting the product");
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
        <Layout title={"Dashboard - Update Product"}>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 lg:mt-24 mt-32">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/12 md:flex-shrink-0 md:p-4">
                        {auth?.user?.role === "vendor" ? (<VendorSidebar />) : (<AdminSidebar />)}
                    </div>
                    <div className="w-full md:w-9/12 mt-6 md:mt-0 p-6 bg-white shadow-lg rounded-lg">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-2 text-center">Update Product</h1>
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="w-full mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                onChange={(value) => setCategory(value)}
                                value={category}
                            >
                                {categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-6 relative">
                                <label className="block text-gray-700 font-medium mb-2">
                                    <div className="flex items-center justify-center w-full h-48 border border-dashed border-gray-300 rounded-md bg-gray-50 cursor-pointer">
                                        {photo ? (
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="Product"
                                                className="object-cover w-60 h-full"
                                            />
                                        ) 
                                        : (
                                            <div className="text-center text-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-12 w-12 mx-auto text-gray-400"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 20h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z"></path>
                                                    <path d="M12 16v-4"></path>
                                                    <path d="M12 12h0"></path>
                                                </svg>
                                                <p className="mt-2">Click or Drag to upload</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Product Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <textarea
                                    value={description}
                                    placeholder="Product Description"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Price"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Quantity"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    onChange={(value) => setShipping(value)}
                                    value={shipping}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                                >
                                    Update Product
                                </button>
                                {auth?.user?.role === "vendor" ? ("") :(<button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex items-center px-4 py-2 bg-red hover:bg-red-700 text-white text-sm font-medium rounded-md"
                                >
                                    Delete Product
                                </button>) }
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProducts;
