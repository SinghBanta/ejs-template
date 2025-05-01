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

    // Step 3: Generate JWT & set cookie
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = login;
