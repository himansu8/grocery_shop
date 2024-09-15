import express from 'express'
import { createRazorpayOrder, verifyPayment } from "../controller/paymentController.js";



const router = express.Router();

router.post("/create", createRazorpayOrder);
router.post("/verify", verifyPayment);

export default router