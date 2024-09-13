const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
