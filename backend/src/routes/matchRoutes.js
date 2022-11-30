const express = require("express");
const matchController = require("../controllers/matchController.js");

const router = express.Router();

router.get("/", matchController.getAllMatches);
router.post("/accept", matchController.addMatches);

module.exports = router;
