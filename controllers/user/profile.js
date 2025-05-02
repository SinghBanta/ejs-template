const pool = require("../../config/db");

const profile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [req.userId]
    );

    if (result.rowCount === 0) {
      req.flash("message", "User not found!");
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = profile;
