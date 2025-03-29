const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0; // Quantity must be >= 0
            },
            message: (props) => `${props.value} is not a valid quantity! It cannot be less than 0.`,
        },
    },
    unit_price: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0; // Unit price must be >= 0
            },
            message: (props) => `${props.value} is not a valid unit price! It cannot be less than 0.`,
        },
    },
    supplier_name: {
        type: String,
        required: true,
    },
    supplier_email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    supplier_phone: {
        type: String, // Use String to avoid issues with leading zeros
        required: true,
        validate: {
            validator: function (v) {
                return /^(07\d{8})$/.test(v); // Must start with '07' and have 10 digits
            },
            message: (props) => `${props.value} is not a valid phone number! It must start with '07' and have 10 digits.`,
        },
    },
    min_level: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Item", ItemSchema);
