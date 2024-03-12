import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      color: String,
      size: [String],
      material: String,
      image: String,
    },
  ],
});

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategories: [subcategorySchema],
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
