const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

// .env file ko read karega
dotenv.config();

// Express app banayi
const app = express();

// MongoDB se connection karega
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// Auth Routes
app.use("/api/auth", authRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("Server is Running");
});

// Port Number
const PORT = process.env.PORT || 3000;

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});