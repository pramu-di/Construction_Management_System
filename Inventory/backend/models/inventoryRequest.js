const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    request_id: {
        type: String,
        required: true,
    },
    item_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    requested_by: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Request", RequestSchema);