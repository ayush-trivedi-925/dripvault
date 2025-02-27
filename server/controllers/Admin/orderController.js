const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const findOrder = await Order.findById(orderId);
    if (!findOrder) {
      return res.status(404).json({
        success: false,
        message: "Order doesn't exists",
      });
    }

    findOrder.orderStatus = orderStatus;
    await findOrder.save();
    res.status(200).json({
      success: true,
      message: "Order status has been updated",
      orderStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
    });
  }
};

module.exports = { getAllOrdersOfAllUser, getOrderDetails, updateOrderStatus };
