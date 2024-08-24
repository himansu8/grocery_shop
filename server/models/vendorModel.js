import mongoose from "mongoose";

const vendorSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
          },
          ownerName: {
            type: String,
            required: true,
            trim: true,
          },
          email: {
            type: String,
            required: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
            trim: true,
          },
          address: {
            type: {},
            required: true,
            trim: true,
          },
          answer: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            default: "vendor",
          },
        },
        { timestamps: true }
    );

    export default mongoose.model("vendorModel", vendorSchema, "Vendors")