import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'productModel',
          required: true,
        },
        name: String,
        slug: String,
        description: String,
        price: Number,
        quantity: Number,
        owner: mongoose.Schema.Types.ObjectId, // Add owner field
      }
    ],
    payment: {
      transactionId: { type: String, required: true },
      method: { type: String, required: true },
      amount: { type: Number, required: true },
      status: { type: String, required: true }
    },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
 
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'addressModel', // Refers to the addressModel
      required: true,
    },
    status: { type: String, default: 'Not Processed' }
  },
  { timestamps: true }
);

export default mongoose.model("orderModel", orderSchema, "Orders");
