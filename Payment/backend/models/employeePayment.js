const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: true,
    },
    employee_name: {
        type: String,
        required: true,
    },
    employee_phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^07\d{8}$/.test(v); // Regex to check if phone number starts with '07' and has exactly 10 digits
            },
            message: props => `${props.value} is not a valid phone number! It should start with '07' and have 10 digits.`,
        },
    },
    salary_amount: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    report_status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
