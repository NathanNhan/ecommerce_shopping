const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    size: {
      type: Array,
      required: false,
    },
    color: {
      type: Array,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product",Product)
