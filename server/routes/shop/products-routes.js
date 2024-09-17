const express = require("express");
const cors = require("cors");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", cors(), getFilteredProducts);
router.get("/get/:id", cors(), getProductDetails);

module.exports = router;
