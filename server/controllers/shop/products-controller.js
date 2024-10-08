const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], type = [], subtype = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {
      isHidden: false  
    };

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (type.length) {
      filters.type = { $in: type.split(",") };
    }

    if (subtype.length) {
      filters.subtype = { $in: subtype.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, isHidden: false });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found or is hidden!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
