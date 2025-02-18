const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Routers
const authRouter = require("./routes/Auth/AuthRoutes.js");

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

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
