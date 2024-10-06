const express = require("express");
const router = express.Router();

const homeController = require("../controller/home.controller");
router.get('/', homeController.getHome)
router.post("/individualAWBId", homeController.postIndividualAWBId);

module.exports = router;