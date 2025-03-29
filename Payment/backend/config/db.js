const mongoose = require("mongoose");

const dburl = "mongodb+srv://shanukainduran:2345@cluster0.ksgze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connection = async () => {
    try {
        await mongoose.connect(dburl);
        console.log("MongoDB Connected~");
    } catch (e) {
        console.error("MongoDB connection failed:", e.message);
        process.exit(1); // Stop the process on failure
    }
};

module.exports = connection;
