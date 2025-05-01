const profile = require("../../controllers/user/profile");

const router = require("express").Router();

router.get("/profile", profile);

module.exports = router;
