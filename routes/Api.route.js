const router = require("express").Router();

const apiRoutes = require("./api/index");

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
  res.render("register", {
    error: null,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  });
});

// GET profile page
router.get("/", (req, res) => {
  res.render("index", {
    error: null,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  });
});

module.exports = router;
