const express = require("express");
const interestController = require("../controllers/interestController.js");

const router = express.Router();

router.get("/", interestController.getAllInterests);

module.exports = router;
