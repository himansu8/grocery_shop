import express from 'express'
import formidable from "express-formidable";
import { createProduct, deleteProduct, getAllProduct, getPhoto, getSingleProduct, updateProduct } from '../controller/productController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

//create products
router.post("/create-product",authMiddleware,isAdmin,formidable(), createProduct)

//update
router.put("/update-product/:pid",authMiddleware,isAdmin,formidable(), updateProduct)

//get all product
router.get("/all-product", getAllProduct)

//get single product
router.get("/single-product/:slug", getSingleProduct)

//delete product
router.delete("/delete-product/:pid",authMiddleware,isAdmin, deleteProduct)

//get photo
router.get("/product-photo/:pid", getPhoto)

export default router;