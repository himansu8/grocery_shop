import express from 'express'
import { authMiddleware, isAdmin, isAdminOrVendor } from '../middlewares/authMiddleware.js';
import { createVendor, deleteVendor, getAllVendors, getVendorById, loginVendor, updateVendor } from '../controller/vendorController.js';

const router = express.Router();


// Create a new vendor
 router.post("/signup",authMiddleware, isAdmin, createVendor);

// Vendor login
router.post("/login", loginVendor);

// // Get a single vendor by ID
 router.get("/single/:id", authMiddleware, isAdmin, getVendorById);

// Update a vendor by ID
router.put("/update/:id",authMiddleware, isAdminOrVendor, updateVendor);

// // Delete a vendor by ID
 router.delete("/delete/:id", authMiddleware, isAdmin, deleteVendor);

// // Get all vendors
 router.get("/", authMiddleware, isAdmin, getAllVendors);


export default router;