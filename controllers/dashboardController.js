const { getDB } = require("../db/db");

const getTotalExpense = async (req, res) => {
  const db = getDB();
  const { userId } = req.user;
  const { startDate, endDate } = req.query;

  let query = `SELECT SUM(amount) as total, COUNT(*) as count
         FROM transactions
         WHERE user_id = ? AND type = 'expense'`;
  let params = [userId];
  if (startDate && endDate) {
    query += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }
  try {
    const [rows] = await db.query(query, params);

    return res.status(200).json({
      total: rows[0].total || 0,
      count: rows[0].count || 0,
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
  const { startDate, endDate } = req.query;

  let query = `SELECT category, SUM(amount) as total
         FROM transactions
         WHERE user_id = ? AND type = 'expense'`;
  let params = [userId];

  if (startDate && endDate) {
    query += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }
  query += ` GROUP BY category`;
  try {
    const [rows] = await db.query(query, params);

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
const getRecentTransactions = async (req, res) => {
  const db = getDB();
  const { userId } = req.user;
  const { limit = 10 } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE user_id=?  
      ORDER BY date DESC 
      LIMIT ? OFFSET ? `,
      [userId, Number(limit), 0],
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getTotalExpense,
  getCategoryWiseExpense,
  getRecentTransactions,
};
