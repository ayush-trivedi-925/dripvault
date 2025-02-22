const express = require("express");
const router = express.Router();
const {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../../controllers/Shop/cartController");

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update", updateCartItemQuantity);
router.delete("/delete/:userId/:productId", deleteCartItem);

module.exports = router;
