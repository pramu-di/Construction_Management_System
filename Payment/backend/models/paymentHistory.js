const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    log_id: {
        type: String,
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("History", HistorySchema);