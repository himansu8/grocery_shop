import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from '../config/config.js';
import vendorModel from "../models/vendorModel.js";

//create a new vendor

export const createVendor = async (req, res) => {
    try {
        const { name, ownerName, email, password, phone, address, answer } = req.body;

        //validations
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!ownerName) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        const existingVendor = await vendorModel.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({
                success: false,
                message: "Vendor with this email already exists.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newVendor = new vendorModel({
            name,
            ownerName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,

        });

        await vendorModel.create(newVendor)
        res.status(200).json({
            success: true,
            message: "Vendor created successfully.",
            newVendor
        });
    } catch (error) {

    }
}


export const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        const vendor = await vendorModel.findOne({ email });
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            });
        }
        const token = JWT.sign(
            { _id: vendor._id, role:vendor.role }, config.PRIVATE_KEY
        )
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: vendor._id,
                name: vendor.name,
                ownerName: vendor.ownerName,
                email: vendor.email,
                phone: vendor.phone,
                address: vendor.address,
                role: vendor.role
            },
            token,
        });


    } catch (error) {

    }
}


export const getVendorById = async (req, res) => {
    try {
        const vendor = await vendorModel.findById(req.params.id);
        //console.log(req.params.id)
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }
        res.status(200).json({
            success: true,
            vendor,
        });
    } catch (error) {
        console.error("Error getting vendor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error - getting single vendor",
        });
    }
}



export const updateVendor = async (req, res) => {
    try {
        const { name, ownerName, email, phone, address, answer } = req.body;

        const vendor = await vendorModel.findById(req.params.id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }


        vendor.name = name || vendor.name;
        vendor.ownerName = ownerName || vendor.ownerName;
        vendor.email = email || vendor.email;
        vendor.phone = phone || vendor.phone;
        vendor.address = address || vendor.address;
        vendor.answer = answer || vendor.answer;

        await vendor.save();

        res.status(200).json({
            success: true,
            message: "Vendor updated successfully.",
            vendor,
        });

    } catch (error) {
        console.error("Error updating vendor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error - updating vendor",
        });
    }
}


export const deleteVendor = async (req, res) => {
    try {
        const vendor = await vendorModel.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        await vendor.deleteOne();

        res.status(200).json({
            success: true,
            message: "Vendor deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting vendor:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error - deleting vendor",
        });
    }
}



export const getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorModel.find();
        res.status(200).json({
            success: true,
            vendors,
        });
    } catch (error) {
        console.error("Error getting vendors:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error - getting vendors",
        });
    }
}