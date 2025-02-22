const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    let sort = {};
    switch (sortBy) {
      case "price - lowtohigh":
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
    if (!products) {
      res.status(500).json({
        success: false,
        message: "Filtered products fetching failed",
      });
    } else {
      res.status(200).json({
        success: true,
        products,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Filtered products fetching failed",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product doesn't exists",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Product fetching failed",
    });
  }
};

module.exports = { getFilteredProducts, getProductById };
