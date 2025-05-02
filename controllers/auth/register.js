const pool = require("../../config/db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, hashedPassword];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "User registration failed" });
    }

    res.redirect("/login");
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = register;
