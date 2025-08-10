import mongoose from "mongoose";

// סכמת הנכס
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    hasPool: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// מודל
const Product = mongoose.model("Product", productSchema);

export default Product;
