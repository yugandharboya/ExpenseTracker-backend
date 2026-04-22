const { getDB } = require("../db/db");

const getTotalExpense = async (req, res) => {
  const db = getDB();
  const { userId } = req.user;

  try {
    const [rows] = await db.query(
      `SELECT SUM(amount) as total
         FROM transactions
         WHERE user_id = ? AND type = 'expense'`,
      [userId],
    );

    return res.status(200).json({
      total: rows[0].total || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCategoryWiseExpense = async (req, res) => {
  const db = getDB();
  const { userId } = req.user;

  try {
    const [rows] = await db.query(
      `SELECT category, SUM(amount) as total
         FROM transactions
         WHERE user_id = ? AND type = 'expense'
         GROUP BY category`,
      [userId],
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getTotalExpense,
  getCategoryWiseExpense,
};
