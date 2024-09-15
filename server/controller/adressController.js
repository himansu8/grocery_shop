import addressModel from '../models/addressModel.js';
import mongoose from 'mongoose';

// Create a new address
export const createAddress = async (req, res) => {
    try {
        const { name, street, city, state, postalCode, country, mobileNumber } = req.body;

        // Create a new address
        const newAddress = new addressModel({
            name,
            street,
            city,
            state,
            postalCode,
            country,
            mobileNumber,
            user: req.user._id 
        });

        // Save the address to the database
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an address
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Check if the address exists
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Update the address
        const updatedAddress = await addressModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the address exists
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Delete the address
        const deletedAddress = await addressModel.findByIdAndDelete(id);

        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all addresses by a user (assuming a user reference in Address model)
export const getAllAddressesByUser = async (req, res) => {
    try {
        //console.log("User Object: ", req.user);
        const userId = new mongoose.Types.ObjectId(req.user._id);

        // Fetch all addresses by userId
        const addresses = await addressModel.find({ user: userId });
        //console.log("Fetched Addresses: ", addresses);
        if (addresses.length === 0) {
            return res.status(404).json({ message: 'No addresses found for this user' });
        }

        
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single address
export const getAddressById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the address exists
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Fetch the address
        const address = await addressModel.findById(id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
