const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Database connection
mongoose
  .connect(
    "mongodb+srv://Ayush123:ayush123@dripvault.fjlip.mongodb.net/dripvault?retryWrites=true&w=majority&appName=DripVault"
  )
  .then(() => console.log("Connection established with MongoDB"))
  .catch((error) => console.log("Connection error", error));

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
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

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
