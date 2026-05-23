const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

const {
  getCurrentUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.get("/me", authenticateToken, getCurrentUser);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
