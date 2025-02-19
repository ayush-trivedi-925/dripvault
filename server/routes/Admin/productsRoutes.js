const express = require("express");
const router = express.Router();
const {
  handleImageUpload,
} = require("../../controllers/Admin/productsController");
const { helper, upload } = require("../../helpers/cloudinary");

router.post("/upload-image", upload.single("my-file"), handleImageUpload);

module.exports = router;
