const login = require("../../controllers/auth/login");
const register = require("../../controllers/auth/register");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
