const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  getTotalExpense,
  getCategoryWiseExpense,
} = require("../controllers/dashboardController");

router.get("/total", authenticateToken, getTotalExpense);

router.get("/category", authenticateToken, getCategoryWiseExpense);

module.exports = router;
