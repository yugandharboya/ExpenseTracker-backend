require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { initializeDB } = require("./db/db");

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// connects route files with base paths
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/dashboard", dashboardRoutes);

initializeDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
});
