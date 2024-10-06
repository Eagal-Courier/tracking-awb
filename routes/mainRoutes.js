const express = require("express");
const router = express.Router();

const homeRoutes = require("./home.routes");
router.use("/", homeRoutes);
router.use("/individualAWBId", homeRoutes);

module.exports = router;
