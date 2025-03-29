const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplierPayment");

// Test route
router.get("/test", (req, res) => res.send("Supplier routes working"));

// Create supplier
router.post("/", (req, res) => {
    Supplier.create(req.body)
        .then(() => res.status(201).json({ msg: "Supplier added successfully" }))
        .catch((err) => {
            console.error("Error creating supplier:", err.message);
            res.status(400).json({ msg: "Supplier adding failed", error: err.message });
        });
});

// Get all suppliers
router.get("/", (req, res) => {
    Supplier.find()
        .then((suppliers) => res.json(suppliers))
        .catch((err) => {
            console.error("Error fetching suppliers:", err.message);
            res.status(400).json({ msg: "No suppliers found", error: err.message });
        });
});

// Get supplier by ID
router.get("/:id", (req, res) => {
    Supplier.findById(req.params.id)
        .then((supplier) => {
            if (!supplier) {
                return res.status(404).json({ msg: "Supplier not found" });
            }
            res.json(supplier);
        })
        .catch((err) => {
            console.error("Error fetching supplier by ID:", err.message);
            res.status(400).json({ msg: "Error fetching supplier", error: err.message });
        });
});

// Update supplier by ID
router.put("/:id", (req, res) => {
    Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((supplier) => {
            if (!supplier) {
                return res.status(404).json({ msg: "Supplier not found" });
            }
            res.json({ msg: "Update Successful", supplier });
        })
        .catch((err) => {
            console.error("Error updating supplier:", err.message);
            res.status(400).json({ msg: "Update Failed", error: err.message });
        });
});

// Delete supplier by ID
router.delete("/:id", (req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
        .then((supplier) => {
            if (!supplier) {
                return res.status(404).json({ msg: "Supplier not found" });
            }
            res.json({ msg: "Delete Successful" });
        })
        .catch((err) => {
            console.error("Error deleting supplier:", err.message);
            res.status(400).json({ msg: "Cannot delete supplier", error: err.message });
        });
});

module.exports = router;
