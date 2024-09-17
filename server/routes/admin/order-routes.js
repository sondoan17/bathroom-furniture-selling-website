const express = require("express");
const cors = require("cors");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", cors(), getAllOrdersOfAllUsers);
router.get("/details/:id", cors(), getOrderDetailsForAdmin);
router.put("/update/:id", cors(), updateOrderStatus);

module.exports = router;
