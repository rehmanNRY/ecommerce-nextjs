import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  avalibleQty: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || model('Product', productSchema);