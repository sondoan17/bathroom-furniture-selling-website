const express = require("express");
const cors = require("cors");

const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();

router.get("/:keyword", cors(), searchProducts);

module.exports = router;
