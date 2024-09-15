import express from 'express'
import { createOrder, getOrders, getOrdersBySeller, getOrdersOfAnUser, singleOrder, updateOrder } from '../controller/orderController.js';
import { authMiddleware, isAdminOrVendor } from '../middlewares/authMiddleware.js';




const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/allOrdersOfAnUser",authMiddleware, getOrdersOfAnUser);
router.get("/singleorder/:id", singleOrder);
router.get("/allOrdersOfAnSeller",authMiddleware, getOrdersBySeller);
router.put("/updateOrder/:orderId",authMiddleware, updateOrder);



export default router