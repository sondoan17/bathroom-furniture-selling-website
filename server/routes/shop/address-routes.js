const express = require("express");
const cors = require("cors");
const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");

const router = express.Router();

router.post("/add", cors(), addAddress);
router.get("/get/:userId", cors(), fetchAllAddress);
router.delete("/delete/:userId/:addressId", cors(), deleteAddress);
router.put("/update/:userId/:addressId", cors(), editAddress);

module.exports = router;
