const express = require("express");
const dbConnection = require("./config/db");
const clientRoutes = require("./routes/client");
const supplierRoutes = require("./routes/supplier");
const employeeRoutes = require("./routes/employee");
const reportRoutes = require("./routes/report");
const historyRoutes = require("./routes/history");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
dbConnection()
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.get("/", (req, res) => res.send("Hello, Server is Running!"));
app.use("/api/client", clientRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/history", historyRoutes);

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
