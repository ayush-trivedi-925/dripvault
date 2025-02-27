const express = require("express");
const router = express.Router();
const {
  getAllOrdersOfAllUser,
  getOrderDetails,
  updateOrderStatus,
} = require("../../controllers/Admin/orderController");

router.get("/get", getAllOrdersOfAllUser);
router.get("/details/:orderId", getOrderDetails);
router.put("/update/:orderId", updateOrderStatus);

module.exports = router;
