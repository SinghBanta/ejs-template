const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const register = require("../../controllers/auth/register");
const loginRateLimiter = require("../../middlewares/ratelimitMiddleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", loginRateLimiter, login);

// GET logout route
router.get("/logout", logout);

module.exports = router;
