const express = require("express");
const router = express.Router();
const Client = require("../models/clientPayment");

// Get all client payments
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(400).json({ msg: "No clients found", error });
  }
});

// Create a new client payment
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json({ msg: "Client added successfully", client });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(400).json({ msg: "Client adding failed", error: error.message });
  }
});

// Get client payment by ID
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ msg: "Cannot find this client", error });
  }
});

// Update client payment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ msg: "Client not found" });
    }
    res.json({ msg: "Update successful", updatedClient });
  } catch (error) {
    res.status(400).json({ msg: "Update failed", error });
  }
});

// Delete client payment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ msg: "Cannot delete. Client not found." });
    }
    res.json({ msg: "Delete successful" });
  } catch (error) {
    res.status(400).json({ msg: "Cannot delete", error });
  }
});

module.exports = router;
