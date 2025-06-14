const express=require('express');
const router=express.Router();
const cardModel=require("../models/card-model");

router.delete("/:id", async function(req, res) {
    try {
        const deletedCard = await cardModel.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;