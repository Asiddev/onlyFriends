const express = require("express");
const matchController = require("../controllers/matchController.js");

const router = express.Router();

router.get("/", matchController.getAllMatches);
router.post("/accept", matchController.acceptMatches);
router.post("/reject", matchController.declineMatches);
router.get("/:id", (req, res) => {
  matchController.getUserMatch(req.params.id).then((match) => {
    res.send(match);
  });
});

router.post("/delete", matchController.deleteMatch);

module.exports = router;
