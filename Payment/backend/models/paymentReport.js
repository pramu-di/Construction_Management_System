const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true,
    },
    report_type: {
        type: String,
        required: true,
    },
    generated_by: {
        type: String,
        required: true,
    },
    date_generated: {
        type: Date,
        required: true,
    },
    report_data: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Report", ReportSchema);