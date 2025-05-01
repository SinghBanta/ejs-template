const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const login = async (req, res) => {
  try {
    const {
      email,
      password,
      "g-recaptcha-response": recaptchaToken,
    } = req.body;

    // Step 1: Verify reCAPTCHA with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const recaptchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: recaptchaToken,
        },
      }
    );

    const { success, "error-codes": errorCodes } = recaptchaRes.data;

    if (!success) {
      return res
        .status(400)
        .json({ error: "Invalid reCAPTCHA. Please try again.", errorCodes });
    }

    // Step 2: Check user in DB
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Step 3: Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = login;
