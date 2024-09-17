const express = require("express");
const cors = require("cors");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", cors(), createOrder);
router.post("/capture", cors(), capturePayment);
router.get("/list/:userId", cors(), getAllOrdersByUser);
router.get("/details/:id", cors(), getOrderDetails);

module.exports = router;
