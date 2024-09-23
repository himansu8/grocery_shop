import express from 'express'
import formidable from "express-formidable";
import { approveProduct, createProduct, deleteProduct, getAllProduct, getPendingProducts, getPhoto, getSingleProduct, getVendorProducts, newlyAddedProduct, otherVendorProduct, productFiltersController, realtedProductController, searchProductController, suggestProductController, updateProduct } from '../controller/productController.js';
import { authMiddleware, isAdmin, isAdminOrVendor, isVendor } from '../middlewares/authMiddleware.js';

const router = express.Router();

//create products
router.post("/create-product",authMiddleware,isAdminOrVendor,formidable(), createProduct)

//update
router.put("/update-product/:pid",authMiddleware,isAdminOrVendor,formidable(), updateProduct)

//get all product
router.get("/all-product", getAllProduct)

//get single product
router.get("/single-product/:slug", getSingleProduct)

//delete product
router.delete("/delete-product/:pid",authMiddleware,isAdminOrVendor, deleteProduct)

//get photo
router.get("/product-photo/:pid", getPhoto)

//filter product
router.post("/product-filters", productFiltersController);

//search product
router.post("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/suggestions", suggestProductController);

//newly added product
router.get("/newlyadded", newlyAddedProduct)

 //vendor--------------------------------------------------------------------------
 router.get('/vendor/products', authMiddleware, isAdminOrVendor, getVendorProducts);

// Route to get all pending products (accessible by admin only)
router.get('/products/pending',authMiddleware, isAdmin, getPendingProducts);

// Route to approve a product (accessible by admin only)
router.put('/:id/approve',authMiddleware, isAdmin, approveProduct);

// Route to get all products of other vendor 
router.get('/vendor-products',authMiddleware, isAdminOrVendor, otherVendorProduct);

export default router;