const express = require("express");
const matchController = require("../controllers/matchController.js");

const router = express.Router();

router.get("/", matchController.getAllMatches);
router.post("/accept", matchController.acceptMatches);
router.post("/reject", matchController.declineMatches);

module.exports = router;
