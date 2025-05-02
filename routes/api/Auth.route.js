const login = require("../../controllers/auth/login");
const register = require("../../controllers/auth/register");
const loginRateLimiter = require("../../middlewares/ratelimitMiddleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", loginRateLimiter, login);

module.exports = router;
