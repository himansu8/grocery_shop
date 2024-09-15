import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    name:{type: String, required: true},
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    mobileNumber: { type: String, required: true },  
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true }
    // You can add more fields if needed
  },
  { timestamps: true }
);

export default mongoose.model('addressModel', addressSchema, 'Addresses');





