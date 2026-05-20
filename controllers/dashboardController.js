const { getDB } = require("../db/db");

const getTotalExpense = async (req, res) => {
  const db = getDB();
  const { userId } = req.user;
  const { startDate, endDate } = req.query;

  let query = `SELECT SUM(amount) as total
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

module.exports = {
  getTotalExpense,
  getCategoryWiseExpense,
};
