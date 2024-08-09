import express from 'express'
import { allCategory, createCategory, deleteCategory, singleCategory, updateCategory } from '../controller/categoryController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';



const router = express.Router();


// create category
router.post("/create-category",authMiddleware,isAdmin, createCategory)

//update category
router.put("/update-category/:id",authMiddleware,isAdmin, updateCategory)

//getALl category
router.get("/get-category", allCategory)

//single category
router.get("/single-category/:slug",singleCategory)


//delete category
router.delete("/delete-category/:id",authMiddleware,isAdmin,deleteCategory)


export default router;