const express = require("express");
const userInterestController = require("../controllers/userInterestController.js");

const router = express.Router();

router.get("/", userInterestController.getAllUserInterests);
router.get("/:id", (req,res) => userInterestController.getUserInterestsById(req.params.id).then((interests) => {res.send(interests)}))
router.post("/", userInterestController.addUserInterests);

module.exports = router;
