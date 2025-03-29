const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    payment_id: {
        type: String, 
        required: true,
    },
    supplier_name: {
        type: String, 
        required: true,
    },
    supplier_phone: {
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^07\d{8}$/.test(v); // Validates phone number to start with '07' and be 10 digits long
            },
            message: props => `${props.value} is not a valid phone number! It should start with '07' and have exactly 10 digits.`,
        },
    },
    supplier_email: {
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Simple email validation
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    supplier_amount: {
        type: Number, 
        required: true,
        min: 0 // Ensures that the amount is not negative
    },
    due_date: {
        type: Date, 
        required: true,
    },
    payment_date: {
        type: Date, 
        required: true,
    },
    status: {
        type: String, 
        required: true,
        enum: ['paid', 'pending', 'overdue'], // Example of allowed statuses
    },
    receipt_status: {
        type: String, 
        required: true,
        enum: ['issued', 'not issued'], // Example of allowed receipt statuses
    },
});

module.exports = mongoose.model("Supplier", SupplierSchema);
