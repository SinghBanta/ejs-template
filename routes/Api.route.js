const router = require("express").Router();
const axios = require("axios");
const apiRoutes = require("./api/index");
require("dotenv").config();

router.use("/api", apiRoutes);

// GET login page
router.get("/login", (req, res) => {
  res.render("login", {
    error: null,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  });
});

// GET register page
router.get("/register", (req, res) => {
  res.render("register");
});

// GET profile page
router.get("/", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    // 2) forward it as a Bearer token in Authorization header
    const response = await axios.get(
      `${process.env.BASE_URL}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    res.render("index", { user: response.data });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    res.status(500).render("error", { message: "Could not load profile" });
  }
});

module.exports = router;
