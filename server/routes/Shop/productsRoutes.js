const express = require("express");
const router = express.Router();
const {
  getFilteredProducts,
  getProductById,
} = require("../../controllers/Shop/productsController");

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductById);

module.exports = router;
