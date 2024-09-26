const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image1: { type: String, default: "" },
    image2: { type: String, default: "" },
    image3: { type: String, default: "" },
    image4: { type: String, default: "" },
    image5: { type: String, default: "" },
    title: String,
    description: String,
    category: String,
    type: String,
    subtype: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
