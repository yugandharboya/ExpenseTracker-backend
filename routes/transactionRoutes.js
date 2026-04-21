const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", authenticateToken, addTransaction);

router.get("/", authenticateToken, getTransactions);

router.put("/:id", authenticateToken, updateTransaction);

router.delete("/:id", authenticateToken, deleteTransaction);

module.exports = router;
