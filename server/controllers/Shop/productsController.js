const Product = require("../../models/Product");

const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(201).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Products fetching failed",
    });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
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

module.exports = { getFilteredProducts };
