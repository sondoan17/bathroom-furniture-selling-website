const express = require("express");
const cors = require("cors");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", cors(), addFeatureImage);
router.get("/get", cors(), getFeatureImages);

module.exports = router;
