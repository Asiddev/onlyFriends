const express = require("express");
const userInterestController = require("../controllers/userInterestController.js");

const router = express.Router();

router.get("/", userInterestController.getAllUserInterests);
router.post("/", userInterestController.addUserInterests);

module.exports = router;
