const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Routers
const authRouter = require("./routes/Auth/AuthRoutes.js");
const adminProductsRouter = require("./routes/Admin/productsRoutes.js");
const shopProductsRouter = require("./routes/Shop/productsRoutes.js");
const shopCartRouter = require("./routes/Shop/cartRoutes.js");
const shopAddressRouter = require("./routes/Shop/addressRoutes.js");
const shopOrderRouter = require("./routes/Shop/orderRoutes.js");
const AdminOrderRouter = require("./routes/Admin/orderRoutes.js");

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection established with MongoDB"))
  .catch((error) => console.log("Connection error", error));

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/order", AdminOrderRouter);

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
