const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  getTotalExpense,
  getCategoryWiseExpense,
  getRecentTransactions,
} = require("../controllers/dashboardController");

router.get("/summary", authenticateToken, getTotalExpense);

router.get("/category-summary", authenticateToken, getCategoryWiseExpense);

router.get("/recent-transactions", authenticateToken, getRecentTransactions);

module.exports = router;
