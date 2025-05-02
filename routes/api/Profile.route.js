const profile = require("../../controllers/user/profile");
const userMiddleware = require("../../middlewares/middleware");

const router = require("express").Router();

router.get("/profile", userMiddleware, profile);

module.exports = router;
