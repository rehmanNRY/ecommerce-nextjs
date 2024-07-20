import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  pic: { type: String, required: true },
  qty: { type: Number, required: true }
}, { _id: false });

const orderSchema = new Schema({
  userId: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending', required: true },
  products: { type: [productSchema], required: true }
}, { timestamps: true });

export default mongoose.models.Order || model('Order', orderSchema);
