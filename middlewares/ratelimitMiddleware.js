const rateLimit = require("express-rate-limit");

// Middleware to limit login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res, next, options) => {
    req.flash("message", options.message);
    return res.redirect("/login");
  },
  message: "Too many login attempts. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginRateLimiter;
