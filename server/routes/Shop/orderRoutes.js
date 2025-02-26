const express = require("express");
const router = express.Router();
const {
  createOrder,
  capturePayment,
} = require("../../controllers/Shop/orderController");

router.post("/create", createOrder);
router.post("/capture", capturePayment);

module.exports = router;
