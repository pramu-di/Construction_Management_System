const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    ireport_id: {
        type: String,
        required: true,
    },
    ireport_type	: {
        type: String,
        required: true,
    },
    istart_date: {
        type: Date,
        required: true,
    },
    iend_date: {
        type: Date,
        required: true,
    },
    idata: {
        type: String,
        required: true,
    },
    ifile_url: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Report", ReportSchema);