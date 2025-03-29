const express = require("express");
const router = express.Router();
const Item = require("../models/inventoryItem");

// Test Route
router.get("/test", (req, res) => res.send("Item routes working"));

// Create a new item
router.post("/", (req, res) => {
    Item.create(req.body)
        .then(() => res.json({ msg: "Item added successfully" }))
        .catch((err) => {
            console.error("Error adding item:", err);
            res.status(400).json({ msg: "Item adding failed", error: err.message });
        });
});

// Get all items
router.get("/", (req, res) => {
    Item.find()
        .then((items) => res.json(items))
        .catch((err) => {
            console.error("Error fetching items:", err);
            res.status(400).json({ msg: "No items found", error: err.message });
        });
});

// Get item by ID
router.get("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ msg: "Item not found" });
            }
            res.json(item);
        })
        .catch((err) => {
            console.error("Error fetching item:", err);
            res.status(400).json({ msg: "Cannot find this item", error: err.message });
        });
});

// Update item by ID
router.put("/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedItem) => res.json({ msg: "Update Successful", item: updatedItem }))
        .catch((err) => {
            console.error("Error updating item:", err);
            res.status(400).json({ msg: "Update failed", error: err.message });
        });
});

// Delete item by ID
router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Delete Successful" }))
        .catch((err) => {
            console.error("Error deleting item:", err);
            res.status(400).json({ msg: "Cannot delete item", error: err.message });
        });
});

module.exports = router;
