// index.js

const express = require("express");
const dbConnection = require("./config/db");
const itemRoutes = require("./routes/iitem");
const requestRoutes = require("./routes/request");
const ireportRoutes = require("./routes/ireport");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Database Connection
dbConnection();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => res.send("YES!"));

// Routes
app.use("/api/item", itemRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/ireport", ireportRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
