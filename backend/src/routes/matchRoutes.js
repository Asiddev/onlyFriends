const express = require("express");
const matchController = require("../controllers/matchController.js");

const router = express.Router();

router.get("/", matchController.getAllMatches);

module.exports = router;
