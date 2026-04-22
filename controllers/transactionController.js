const { getDB } = require("../db/db");

const addTransaction = async (req, res) => {
  const db = getDB();
  const { title, amount, category, type, date } = req.body;
  const { userId } = req.user;

  if (!title || !category || !type || !date) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const parsedAmount = Number(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  try {
    await db.query(
      `INSERT INTO transactions
       (user_id, title, amount, type, category, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, title, parsedAmount, type, category, date],
    );

    return res.status(201).json({
      message: "Transaction added successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTransactions = async (req, res) => {
  const db = getDB();

  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    startDate,
    endDate,
  } = req.query;

  const { userId } = req.user;

  let query = `SELECT * FROM transactions WHERE user_id = ?`;
  let params = [userId];

  if (search) {
    query += ` AND LOWER(title) LIKE LOWER(?)`;
    params.push(`%${search}%`);
  }

  if (category) {
    query += ` AND LOWER(category) = ?`;
    params.push(category.toLowerCase());
  }

  if (startDate && endDate) {
    query += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  query += ` ORDER BY date DESC LIMIT ? OFFSET ?`;

  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query(query, [
      ...params,
      Number(limit),
      Number(offset),
    ]);

    return res.status(200).json({
      transactions: rows,
      hasMore: rows.length === Number(limit),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTransaction = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { title, amount, category, type, date } = req.body;
  const { userId } = req.user;

  const parsedAmount = Number(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE id = ? AND user_id = ?`,
      [id, userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await db.query(
      `UPDATE transactions
       SET title=?, amount=?, type=?, category=?, date=?
       WHERE id=? AND user_id=?`,
      [title, parsedAmount, type, category, date, id, userId],
    );

    return res.status(200).json({
      message: "Transaction updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTransaction = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE id = ? AND user_id = ?`,
      [id, userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await db.query(`DELETE FROM transactions WHERE id = ? AND user_id = ?`, [
      id,
      userId,
    ]);

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
