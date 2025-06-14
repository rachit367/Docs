const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cardModel = require("../models/card-model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // optionally make this unique
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async function (req, res) {
  try {
    const file = req.file;
    const url = `/uploads/${file.filename}`;
    const savedCard = await cardModel.create({ name: file.originalname, url });

    res.status(200).json({
      message: "File uploaded successfully",
      file: savedCard
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
