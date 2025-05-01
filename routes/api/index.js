const router = require("express").Router();

const authRoutes = require("./Auth.route");
const profileRoutes = require("./Profile.route");

router.use("/auth", authRoutes);
router.use("/user", profileRoutes);

module.exports = router;
