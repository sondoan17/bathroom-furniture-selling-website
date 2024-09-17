const express = require("express");
const cors = require("cors");
const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

router.post("/add", cors(), addProductReview);
router.get("/:productId", cors(), getProductReviews);

module.exports = router;
