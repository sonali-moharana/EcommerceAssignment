import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
