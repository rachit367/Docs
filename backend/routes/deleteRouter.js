const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cardModel = require("../models/card-model");

router.delete("/:id", async function (req, res) {
  try {
    const deletedCard = await cardModel.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found in database' });
    }

    // ✅ changed .image to .url
    if (!deletedCard.url) {
      return res.status(200).json({
        message: 'Deleted from DB, but no file path found',
        id: req.params.id
      });
    }

    const filePath = path.join(__dirname, "../uploads", deletedCard.name);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("File deletion error:", err);
        return res.status(200).json({
          message: 'DB deleted, file deletion failed',
          id: req.params.id
        });
      }

      res.status(200).json({ message: 'Deleted successfully', id: req.params.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
