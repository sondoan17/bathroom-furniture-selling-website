const express = require("express");
const cors = require("cors");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", cors(), upload.single("my_file"), handleImageUpload);
router.post("/add", cors(), addProduct);
router.put("/edit/:id", cors(), editProduct);
router.delete("/delete/:id", cors(), deleteProduct);
router.get("/get", cors(), fetchAllProducts);

module.exports = router;
