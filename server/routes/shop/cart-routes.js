const express = require("express");
const cors = require("cors");
const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", cors(), addToCart);
router.get("/get/:userId", cors(), fetchCartItems);
router.put("/update-cart", cors(), updateCartItemQty);
router.delete("/:userId/:productId", cors(), deleteCartItem);

module.exports = router;
