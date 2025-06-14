const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); 
const cardModel = require("../models/card-model");

router.delete("/:id", async function (req, res) {
    try {
        const deletedCard = await cardModel.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ message: 'File not found in database' });
        }

        const filePath = path.join(__dirname, "../uploads", deletedCard.image);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("File deletion error:", err);
                return res.status(200).json({
                    message: 'Database entry deleted, but file could not be removed',
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
