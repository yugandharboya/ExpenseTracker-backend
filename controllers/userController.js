const { getDB } = require("../db/db");

const getAllUsers = async (req, res) => {
  const db = getDB();

  try {
    const [rows] = await db
      .promise()
      .query(`SELECT id, name, email, created_at FROM users`);

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query(`SELECT id FROM users WHERE id = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await db.promise().query(`DELETE FROM users WHERE id = ?`, [id]);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { getAllUsers, deleteUser };
