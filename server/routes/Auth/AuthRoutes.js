const express = require("express");
const router = express.Router();
const { registerUser } = require("../../controllers/Auth/AuthController.js");

router.post("/register", registerUser);

module.exports = router;
