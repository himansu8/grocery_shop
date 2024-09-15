import paymentModel from "../models/paymentModel.js";
import config from "../config/config.js";
import Razorpay from 'razorpay';
import crypto from "crypto";

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_SECRET,
});

// Create a new payment order
export const createRazorpayOrder = async (req, res) => {
    const { amount } = req.body;
  
    try {
      const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
  
      razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Error creating Razorpay order",
          });
        }
  
        res.status(200).json({
          success: true,
          order,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating order",
      });
    }
  };
  
  // Verify payment signature
  export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    try {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", config.RAZORPAY_SECRET)
        .update(sign)
        .digest("hex");
  
      if (expectedSign === razorpay_signature) {
        const newPayment = new paymentModel({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
  
        await newPayment.save();
  
        res.status(200).json({
          success: true,
          message: "Payment verified successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid signature",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error verifying payment",
      });
    }
  };